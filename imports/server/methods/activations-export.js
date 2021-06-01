/* Activations Reader */

import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';


const activations_export = Meteor.wrapAsync(function (bucket, filename, filter, cb) {

	const selected = Activations.find(filter).fetch();
	
	const activations_export = [];
	
	selected.forEach(item => activations_export.push(item));

	const content = JSON.stringify(activations_export, null, 2);
	const count = activations_export.length;
	
	
	minioClient.putObject(bucket, filename, content, function(error, etag) {
		if(error) {
			error(`Error: ${error.message}`, {message: error.message, stack: error.stack});
		  	cb(error, null); 
		}
		cb(null, count);
	});	
	
});


module.exports = { activations_export };


