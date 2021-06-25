/** gif-interaction.js **/

console.log('loading gif-interaction.js');

const applyForPolicy = Meteor.wrapAsync(async (bpKey, data, cb) => {

	console.log(data);
	cb(null, 'Success');

	const result = await Product.applyForPolicy(bpKey, data);

	info('Result of applyForPolicy:', result);

});


module.exports = { applyForPolicy };
