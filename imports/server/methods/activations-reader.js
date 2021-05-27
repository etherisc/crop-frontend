/* Activations Reader */

import { getMinioObject } from '/imports/server/methods/minio.js';


const readActivationsFile = (bucket, filename, prefix) => {

	try {

		const act_content = getMinioObject(bucket, filename);

		const act_json = JSON.parse(act_content);

		Activations.remove({prefix});	

		let counter = 0;
		act_json.forEach(item => {

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
			const pixel = latLng2PixelStr({lat: Number(latitude), lng: Number(longitude)});

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
						region,
						county,
						ward,
						district,
						village,
						pixel,
						mpesa_ref,
						mpesa_name,
						prefix					
					}
				}
			);

			incrementCount(pixel);

		});

		info('readActivations successful', {
			act_content: act_content.slice(0,80),
			counter
		});

		return `${counter} activations imported.`;

	} catch (e) {
		throw new Meteor.Error('Error', e.message, e.stack);
	}
};

const incrementCount = (pixel) => {
	
	const count = RecordCounts.findOne({pixel});
	
	if (count) {
		RecordCounts.update({pixel}, {$set: {count: count.count + 1}});
	} else {
		RecordCounts.insert({pixel, count: 1});
	}
};

const countActivations = () => {

	RecordCounts.remove({});
	activations = Activations.find({});

	activations.forEach((activation) => {
		const newPixel = latLng2PixelStr({lat: activation.latitude, lng: activation.longitude});
		Activations.update({_id: activation._id}, {$set: {pixel: newPixel}});
		incrementCount(newPixel);

	});
	
	info('countActivations successful');

	return `Activations counter updated.`;


}; 

const activation_aggregates = function (filter) {

	const selected = Activations.find(filter).fetch();

	let amount = 0.0;
	let activations = 0;
	
	selected.forEach(item => {
		activations += + 1;
		amount += item.amount_premium;
	});

	info('Calculate Activation aggregates', {activations, amount});

	return {
		activations,
		amount
	};

}


module.exports = { countActivations, readActivationsFile, activation_aggregates };





