/** gif-interaction.js **/
console.log('loading gif-interaction.js');


const Product = new ethers.Contract(
	settings('gif.product.addr'), 						
	settings('gif.product.abi'), 
	eth.wallet
);		


const applyForPolicy = async (bpKey, data) => {
	Product.applyForPolicy(bpKey, data);
};
