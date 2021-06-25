/* Activations Reader */

import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';


const exportActivations = Meteor.wrapAsync(function ({bucket, folder, filename, filter}, cb) {

	const selected = Activations.find(filter).fetch();
	const path = `${folder}/${filename}`;
	
	const activations_export = [];
	const normalizeCrop = (crop) => ({
		"Soya Beans" 	: "SoyBeans",
		"Crop"			: "Crop",
		"Maize"			: "Maize",
		"Potatoes"		: "Potato",
		"Beans"			: "SoyBeans",
		"Sorghum"		: "Sorghum",
		"Green grams"	: "Greengrams",
		"Wheat"			: "Wheat"
	}[crop]);
	
		
	selected.forEach(item => {
		item.value_chain = normalizeCrop(item.value_chain);
		activations_export.push(item);
	});

	const content = JSON.stringify(activations_export, null, 2);
	const count = activations_export.length;
	
	
	minioClient.putObject(bucket, path, content, function(error, etag) {
		if(error) {
			error(`Error: ${error.message}`, {
				message: error.message, 
				stack: error.stack
			});
		  	cb(error, null); 
		}
		cb(null, `${count} activations exported to ${bucket}/${path}`);
	});	
	
});


module.exports = { exportActivations };


