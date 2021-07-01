/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const applyForPolicy = async (args) => {

	console.log(args);

	const bpKey = s32b('TestKey');
	const data = s32b('TestData');
	
	
	try {
		const result = await Product.applyForPolicy(bpKey, data, {gasLimit: 500000});

		info('Result of applyForPolicy:', result);
		return 'Success!';
		
	} catch (err) {
		error('Error applyForPolicy', {message: err.message, stack: err.stack});
		return err.message;
	}
	


};


module.exports = { applyForPolicy };
