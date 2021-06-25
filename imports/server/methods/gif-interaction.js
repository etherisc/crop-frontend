/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const ethers = require('ethers');



const applyForPolicy = async (bpKey, data) => {

	const Product = new ethers.Contract(
		settings('gif.product.addr'), 						
		settings('gif.product.abi'), 
		eth.wallet
	);		

	console.log(data);
	return 'Success';

	const result = await Product.applyForPolicy(bpKey, data);

	info('Result of applyForPolicy:', result);

};
