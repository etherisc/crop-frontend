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

/*
const applyForPolicy = (bpKey, data) => contractCall('applyForPolicy', bpKey, data);
const underwrite = (bpKey) => contractCall('underwrite', bpKey);
const claim = (bpKey, data) => contractCall('newClaim', bpKey, data);
const payout = (bpKey, payoutId, data) => contractCall('payout', bpKey, payoutId, data);
*/

const applyForPolicy = async (args) => {
		
	const {policy: {_id}} = args;
	const {bc_trail, group_policy_id, gp_id, phone_no, premium_amount, sum_insured_amount, activation: {timestamp}} = Policies.findOne({_id});
		
	if (bc_trail && bc_trail.apply) {
		const msg = `Policy ${_id} already applied`;
		error(msg, {_id});
		throw new Meteor.Error(msg);
	}
	
	const bpKey = eth.s32b(_id);
	const {text, hash} = keccak256({
		group_policy_id,
		phone_no,
		premium_amount,
		sum_insured_amount,
		timestamp});
		
	console.log(bpKey, text, hash);
	const {receipt: {transactionHash, blockNumber}} = await contractCall('applyForPolicy', bpKey, hash);
	
	const apply = {text, hash, transactionHash, blockNumber, timestamp: await eth.blockTimestamp(blockNumber)};
	
	Policies.update({_id}, {$set: {bc_trail: {apply}, next_action: 'underwrite'}});
	info(`applyForPolicy ${bpKey}`, {apply});
	return 'Success!';
	
}

const underwrite = async (_id) => {
}

const claim = async (_id) => {
}

const payout = async (_id) => {
}


module.exports = { applyForPolicy, underwrite, claim, payout };
