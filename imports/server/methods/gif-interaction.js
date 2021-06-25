/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const applyForPolicy = async (bpKey, data) => {

	console.log(data);
	return 'Success';

	const result = await Product.applyForPolicy(bpKey, data);

	info('Result of applyForPolicy:', result);

};


module.exports = { applyForPolicy };
