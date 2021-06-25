/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const applyForPolicy = async (args) => {

	console.log(args);

	try {
		const result = await Product.applyForPolicy(bpKey, data);

		info('Result of applyForPolicy:', result);
		return 'Success!';
		
	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}
	


};


module.exports = { applyForPolicy };
