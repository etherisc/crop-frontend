console.log('loading gif-interaction.js');

const abiDecoder = require('abi-decoder');

import { eth, gif } from '/imports/server/methods/ethereum-provider.js';
import { settings } from '/imports/server/methods/settings.js';
import { productABI } from '/both/lib/contract-abi.js';


let policyABI = '';
const Product = new eth.ethers.Contract(
	settings('gif.product.address'), 						
	productABI, 
	eth.wallet()
);	

let lock = false;

const unlock = async () => {
	const pauseFor = async (milliSec) => await new Promise((resolve) => setTimeout(resolve, milliSec));
	while (lock) await pauseFor(100);
}
	

const contractCall = async (method, ...args) => {

	if (policyABI == '') {
		const PolicyContract = await gif.getContractConfig('PolicyController');
		policyABI = PolicyContract.abi;
		abiDecoder.addABI(policyABI);
	}

	if (lock) await unlock();
	
	try {
		lock = true;
		const txResponse = await Product[method](...args, {gasLimit: 600000});
		lock = false;
		const receipt = await txResponse.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);

		info(`Tx Response ${method}`, { txResponse, receipt, logs });
		return {txResponse, receipt, logs};

	} catch (err) {

		error(`Error ${method}`, { args, message: err.message, stack: err.stack });
		throw new Meteor.Error(err.message);
	}

};


const keccak256 = (obj) => {
	if (!obj) obj = {};
	const text = JSON.stringify(obj);
	const hash = eth.ethers.utils.keccak256(Buffer.from(text));
	return { text, hash };
};

const uuid2bpKey = (uuid) => `0x${uuid.replace(/-/g,'').padEnd(64, '0')}`;
const bpKey2uuid = (bpKey) => {
	const raw = Buffer.from(bpKey.slice(2), 'hex').toString('hex').replace(/(00)+$/, '');
	return `${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20,32)}`;
}

const applyForPolicy = async (args) => {

	const { policy: { _id } } = args;
	let {bc, group_policy_id, gp_id, phone_no, premium_amount, sum_insured_amount, meta: {created_at}} = Policies.findOne({_id});

	if (bc) {
		const msg = `Policy ${_id} already applied`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	bc = { bpKey: uuid2bpKey(_id) };

	const {text, hash} = keccak256({
		group_policy_id,
		phone_no,
		premium_amount,
		sum_insured_amount,
		created_at});

	const { receipt: { transactionHash, blockNumber } } = await contractCall('applyForPolicy', bc.bpKey, hash);

	bc.apply = {
		text, 
		hash, 
		transactionHash, 
		blockNumber, 
		timestamp: await eth.blockTimestamp(blockNumber)
	};

	Policies.update({ _id }, { $set: { bc } });
	info(`applyForPolicy ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';

}

const underwrite = async (args) => {

	const { policy: { _id } } = args;
	let { bc } = Policies.findOne({_id});

	if (!bc || bc.underwrite) {
		const msg = bc ? `Policy ${_id} already underwritten` : `Policy ${_id} not applied`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	const { receipt: { transactionHash, blockNumber } } = await contractCall('underwrite', bc.bpKey);

	bc.underwrite = {
		transactionHash, 
		blockNumber, 
		timestamp: await eth.blockTimestamp(blockNumber)
	};

	Policies.update({ _id }, { $set: { bc } });
	info(`underwrite ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';
}

const claim = async (args, claimIndex) => {

	const { policy: { _id } } = args;
	let { bc, claims } = Policies.findOne({_id});
	const claim = claims[claimIndex];

	if (!bc || (bc.claims && bc.claims[claimIndex])) {
		const msg = bc ? `Policy ${_id} with claimIndex ${claimIndex} already claimed` : `Policy ${_id} not applied`;
		error(msg, { _id, claimIndex });
		throw new Meteor.Error(msg);
	}

	if (!bc.claims) bc.claims = [];

	const {text, hash} = keccak256(claim);

	const {receipt: {transactionHash, blockNumber}, logs} = await contractCall('newClaim', bc.bpKey, hash);

	bc.claims[claimIndex] = {
		text,
		hash,
		transactionHash, 
		blockNumber, 
		timestamp: await eth.blockTimestamp(blockNumber),
		logs
	};

	Policies.update({ _id }, { $set: { bc } });
	info(`claim ${bpKey2uuid(bc.bpKey)} claimIndex ${claimIndex}`, bc);
	return 'Success!';
}

const payout = async (args) => {
	
	return 'Not implemented'; 
	
	// Needs rework

	const {policy: {_id}} = args;
	let {bc, executedPayout} = Policies.findOne({_id});

	if (bc && bc.payout) {
		const msg = `Policy ${_id} already paid out`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}

	if (!bc) {
		bc = {bpKey: uuid2bpKey(_id)};
	}

	const logNewPayout = bc.claim.logs.find(log => log.name === 'LogNewPayout');
	const payoutId = parseInt(logNewPayout.events.find(event => event.name === 'payoutId').value);


	const {text, hash} = keccak256(executedPayout);

	const {receipt: {transactionHash, blockNumber}} = await contractCall('payout', bc.bpKey, payoutId, hash);

	bc = {
		payout: {
			payoutId,
			transactionHash, 
			blockNumber, 
			timestamp: await eth.blockTimestamp(blockNumber)
		},
		...bc
	};
	bc.next_action = 'finished';

	Policies.update({_id}, {$set: {bc}});
	info(`payout ${bpKey2uuid(bc.bpKey)}`, bc);
	return 'Success!';
}




module.exports = { applyForPolicy, underwrite, claim, payout };
