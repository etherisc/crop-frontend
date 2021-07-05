console.log('loading gif-interaction.js');

const abiDecoder = require('abi-decoder');


import { eth } from '/imports/server/methods/ethereum-provider.js';
import { settings } from '/imports/server/methods/settings.js';
import { productABI, policyABI } from '/both/lib/contract-abi.js';



abiDecoder.addABI(policyABI);

const contractCall = async (method, ...args) => {

	const Product = new eth.ethers.Contract(
		settings('gif.product.address'), 						
		productABI, 
		eth.wallet()
	);	

	try {

		const txResponse = await Product[method](...args);
		const receipt = await txResponse.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);

		info(`Tx Response ${method}`, {txResponse, receipt, logs});
		return {txResponse, receipt, logs};

	} catch (err) {

		error(`Error ${method}`, {args, message: err.message, stack: err.stack});
		throw new Meteor.Error(err.message);
	}



};


const keccak256 = (obj) => {
	const text = JSON.stringify(obj);
	const hash = eth.ethers.utils.keccak256(Buffer.from(text));
	return {text, hash};
};

const uuid2bpKey = (uuid) => `0x${uuid.replace(/-/g,'').padEnd(64, '0')}`;
const bpKey2uuid = (bpKey) => Buffer.from(bpKey, 'hex').toString('hex');

/*
const applyForPolicy = (bpKey, data) => contractCall('applyForPolicy', bpKey, data);
const underwrite = (bpKey) => contractCall('underwrite', bpKey);
const claim = (bpKey, data) => contractCall('newClaim', bpKey, data);
const payout = (bpKey, payoutId, data) => contractCall('payout', bpKey, payoutId, data);
*/

const applyForPolicy = async (args) => {

	const {policy: {_id}} = args;
	let {bc, group_policy_id, gp_id, phone_no, premium_amount, sum_insured_amount, activation: {timestamp}} = Policies.findOne({_id});

	if (bc && bc.apply) {
		const msg = `Policy ${_id} already applied`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	bc = {bpKey: uuid2bpKey(_id)};
	const {text, hash} = keccak256({
		group_policy_id,
		phone_no,
		premium_amount,
		sum_insured_amount,
		timestamp});

	const {receipt: {transactionHash, blockNumber}} = await contractCall('applyForPolicy', bc.bpKey, hash);

	bc = {
		apply: {
			text, 
			hash, 
			transactionHash, 
			blockNumber, 
			timestamp: await eth.blockTimestamp(blockNumber)
		}, 
		...bc
	};
	bc.next_action = 'underwrite';

	Policies.update({_id}, {$set: {bc}});
	info(`applyForPolicy ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';

}

const underwrite = async (args) => {

	const {policy: {_id}} = args;
	let {bc} = Policies.findOne({_id});

	if (bc && bc.underwrite) {
		const msg = `Policy ${_id} already underwritten`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	const {receipt: {transactionHash, blockNumber}} = await contractCall('underwrite', bc.bpKey);

	bc = {
		underwrite: {
			transactionHash, 
			blockNumber, 
			timestamp: await eth.blockTimestamp(blockNumber)
		},
		...bc
	};
	bc.next_action = 'claim';

	Policies.update({_id}, {$set: {bc}});
	info(`underwrite ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';
}

const claim = async (args) => {

	const {policy: {_id}} = args;
	let {bc, payout} = Policies.findOne({_id});

	if (bc && bc.claim) {
		const msg = `Policy ${_id} already claimed`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	const {text, hash} = keccak256(payout);

	const {receipt: {transactionHash, blockNumber}, logs} = await contractCall('newClaim', bc.bpKey, hash);

	bc = {
		claim: {
			text,
			hash,
			transactionHash, 
			blockNumber, 
			timestamp: await eth.blockTimestamp(blockNumber),
			logs
		},
		...bc
	};
	bc.next_action = 'payout';

	Policies.update({_id}, {$set: {bc}});
	info(`claim ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';
}

const payout = async (args) => {

	const {policy: {_id}} = args;
	let {bc} = Policies.findOne({_id});

	if (bc && bc.underwrite) {
		const msg = `Policy ${_id} already applied`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	const {receipt: {transactionHash, blockNumber}} = await contractCall('payout', bc.bpKey, bc.payoutId);

	bc = {
		payout: {
			transactionHash, 
			blockNumber, 
			timestamp: await eth.blockTimestamp(blockNumber)
		},
		...bc
	};
	bc.next_action = 'none';

	Policies.update({_id}, {$set: {bc}});
	info(`payout ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';
}


module.exports = { applyForPolicy, underwrite, claim, payout };
