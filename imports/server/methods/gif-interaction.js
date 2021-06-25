/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const ethers = require('ethers');


const Product = new ethers.Contract(
	settings('gif.product.addr'), 						
	settings('gif.product.abi'), 
	eth.wallet
);		


const applyForPolicy = async (bpKey, data) => {
	
	
	console.log(data);
	return 'Success';
	
	const result = await Product.applyForPolicy(bpKey, data);
	
	info('Result of applyForPolicy:', result);
	
};
