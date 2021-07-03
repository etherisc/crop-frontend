console.log('loading gif-interaction.js');

import { eth } from '/imports/server/methods/ethereum-provider.js';


const applyForPolicy = async (args) => {

	console.log(args);

	const bpKey = eth.s32b('TestKey');
	const data = eth.s32b('TestData');

	try {
		const Product = new eth.ethers.Contract(
			settings('gif.product.address'), 						
			settings('gif.product.abi'), 
			eth.wallet()
		);		

		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


module.exports = { applyForPolicy };
