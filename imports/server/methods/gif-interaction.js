console.log('loading gif-interaction.js');

import { eth } from '/imports/server/methods/ethereum-provider.js';
import { settings } from '/imports/server/methods/settings.js';

const applyForPolicy = async (args) => {

	console.log(args);
	console.log(eth);

	const bpKey = eth.s32b('TestKey');
	const data = eth.s32b('TestData');

	try {
		const Product = new eth.ethers.Contract(
			settings('gif.product.address'), 						
			settings('gif.product.abi'), 
			eth.wallet()
		);		

		const result = await Product.applyForPolicy(bpKey, data, {from: settings('gif.from'), gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';

	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}



};


module.exports = { applyForPolicy };
