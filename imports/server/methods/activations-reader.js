/* Activations Reader */

const minio = require('minio');


const select = (obj, keys) => {

	let target = {};
	keys.forEach(item => target = Object.assign(obj[item], target));
	return target;

};


const getMinioObject = Meteor.wrapAsync((bucket, filename, cb) => {

	let content = '';

	minioClient.getObject(bucket, filename, function(err, dataStream) {
		if (err) {
			cb(err, null);
		}
		dataStream.on('data', function(chunk) {
			content += chunk;
		})
		dataStream.on('end', function() {
			cb(null, content);
		})
		dataStream.on('error', function(err) {
			cb(err, null);
		})
	})

});


const readActivationsFile = async ({ bucket, filename, action }) => {

	try {
				
		if (action != 'readActivations') {
			error(`Wrong Action (expected: readActivations, received: ${data.action}`, data);
			return;
		}
		
		const act_content = getMinioObject(bucket, filename);

		const act_json = JSON.parse(act_content);

		info('readActivations successful');
		return;
		Activations.remove({prefix});	

		let counter = 0;
		act_json.forEach(item => {


			if (!order_number) return;


			counter += 1;

			let { 
				mobile_no,
				serial_number,
				order_number,
				premium_amount,
				denomination,
				region,
				county,
				ward,
				district,
				village,
				value_chain,
				voucher_code,
				longitude,
				latitude,
				mpesa_ref,
				mpesa_name,
				date_activated
			} = item; 

			order_number = serial_number ? serial_number : (order_number ? order_number : null);
			const amount_premium = premium_amount ? premium_amount : (denomination ? denomination : null);

			const result = Activations.upsert(
				{ order_number },
				{ 
					$set: {
						mobile_num: mobile_no,
						call_time: date_activated,
						latitude: Number(latitude),
						longitude: Number(longitude),
						order_number,
						activation_code: voucher_code,
						value_chain,
						amount_premium,
						pixel: latLng2PixelStr({lat: Number(latitude), lng: Number(longitude)}),
						mpesa_ref,
						mpesa_name,
						prefix					
					}
				}
			);

		});

		return counter;
	} catch (e) {
		err(e.message, {stack: e.stack});
	}
}




module.exports = { readActivationsFile };





