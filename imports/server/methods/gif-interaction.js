console.log('loading gif-interaction.js');

const abiDecoder = require('abi-decoder');


import { eth } from '/imports/server/methods/ethereum-provider.js';
import { settings } from '/imports/server/methods/settings.js';
import { v4 as uuidv4 } from 'uuid';
import { productABI, policyABI } from '/both/lib/contract-abi.js';



const Product = new eth.ethers.Contract(
			settings('gif.product.address'), 						
			productABI, 
			eth.wallet()
		);	

abiDecoder.addABI(policyABI);

const applyForPolicy = async (args) => {

	const bpKey = eth.s32b(args.activation._id);
	const data = eth.s32b('TestData');

	try {

		const result = await Product.applyForPolicy(bpKey, data);
		const receipt = await result.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);
		
		info(`Result of applyForPolicy ${bpKey}`, {result, receipt, logs});
		return 'Success!';

	} catch (err) {
		error(`Error applyForPolicy ${bpKey}`, {args, message: err.message, stack: err.stack});
		return err.message;
	}



};


const underwrite = async (args) => {

	const bpKey = eth.s32b(args.activation._id);

	try {

		const result = await Product.underwrite(bpKey, {gasLimit: 3000000});
		const receipt = await result.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);

		info(`Result of underwrite ${bpKey}`, {result, receipt, logs});
		return 'Success!';

	} catch (err) {
		error(`Error underwrite ${bpKey}`, {args, message: err.message, stack: err.stack});
		return err.message;
	}



};


const claim = async (args) => {

	const bpKey = eth.s32b(args.activation._id);
	const data = eth.s32b('TestData');

	try {

		const result = await Product.newClaim(bpKey, data);
		const receipt = await result.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);

		info(`Result of underwrite ${bpKey}`, {result, receipt, logs});
		return 'Success!';

	} catch (err) {
		error(`Error underwrite ${bpKey}`, {args, message: err.message, stack: err.stack});
		return err.message;
	}



};


const payout = async (args) => {

	const bpKey = eth.s32b(args.activation._id);
	const data = eth.s32b('TestData');

	try {

		const result = await Product.payout(bpKey, data);
		const receipt = await result.wait();
		const logs = abiDecoder.decodeLogs(receipt.logs);

		info(`Result of underwrite ${bpKey}`, {result, receipt, logs});
		return 'Success!';

	} catch (err) {
		error(`Error underwrite ${bpKey}`, {args, message: err.message, stack: err.stack});
		return err.message;
	}



};



module.exports = { applyForPolicy, underwrite, claim, payout };
