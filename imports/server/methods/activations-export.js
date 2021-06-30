/* Activations Reader */

import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';


const exportActivations = Meteor.wrapAsync(function ({bucket, folder, filename, filter}, cb) {

	const selected = Activations.find(filter).fetch();
	const path = `${folder}/${filename}`;
	
	const activations_export = [];
	const normalizeCrop = (crop) => ({
		"Beans"			: "SoyBeans",
		"Crop"			: "Crop",
		"Greengrams"	: "Greengrams",
		"Green grams"	: "Greengrams",
		"Maize"			: "Maize",
		"Potato"		: "Potato",
		"Potatoes"		: "Potato",
		"Sorghum"		: "Sorghum",
		"Sorghum"		: "Sorghum",
		"Soya Beans" 	: "SoyBeans",
		"SoyBeans"		: "SoyBeans",
		"Wheat"			: "Wheat"
	}[crop]);
		
	selected.forEach(item => {
		item.value_chain = normalizeCrop(item.value_chain);
		if (!item.call_time) return;
		item.call_time = new Date(item.call_time);
		item.mobile_num = item.mobile_num.toString();
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


