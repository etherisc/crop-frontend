console.log('loading gif-interaction.js');

import { eth } from '/imports/server/methods/ethereum-provider.js';
import { settings } from '/imports/server/methods/settings.js';
import { v4 as uuidv4 } from 'uuid';

const Product = new eth.ethers.Contract(
			settings('gif.product.address'), 						
			settings('gif.product.abi'), 
			eth.wallet()
		);	


const applyForPolicy = async (args) => {
	// args == t.data
	console.log(args);

	const bpKey = eth.s32b(uuidv4());
	const data = eth.s32b('TestData');

	try {

		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


const underwrite = async (args) => {
	// args == t.data
	console.log(args);

	const bpKey = eth.s32b(uuidv4());
	const data = eth.s32b('TestData');

	try {

		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


const claim = async (args) => {
	// args == t.data
	console.log(args);

	const bpKey = eth.s32b(uuidv4());
	const data = eth.s32b('TestData');

	try {

		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


const payout = async (args) => {
	// args == t.data
	console.log(args);

	const bpKey = eth.s32b(uuidv4());
	const data = eth.s32b('TestData');

	try {

		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


module.exports = { applyForPolicy, underwrite, claim, payout };
