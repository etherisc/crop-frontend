/* Activations Reader */

import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';


const readActivationsFile = ({bucket, filename, prefix, subsidy=false}) => {

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
				date_activated,
				amount_subsidy
			} = item; 

			order_number = serial_number ? serial_number : (order_number ? order_number : null);
			const amount_premium = premium_amount ? premium_amount : (denomination ? denomination : null);
			const pixel = latLng2PixelStr({lat: Number(latitude), lng: Number(longitude)});

			if (subsidy) {
				activation = Activations.findOne({mobile_no, value_chain});
				if (activation) {
					// Update existing activation
					Activations.update(
						{_id: activation._id}, {$set: {
							amount_subsidy,
							amount_premium: amount_premium + amount_subsidy,
							date_activated,
						}});
				} else {
					// Insert new Activation
					order_number = `Subsidy-${subsidy-counter}`;
					Activations.insert({
						
						
					});
				}

			} else {
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
							amount_subsidy,
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
			};
			
			M

		});

		info('readActivations successful', {
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
		amount += Number(item.amount_premium);
	});

	info('Calculate Activation aggregates', {activations, amount});

	return {
		activations,
		amount
	};

}

const createPartners = () => {

	Activations
	.find({})
	.forEach(({mobile_num, mpesa_name}) => {

		if (!mpesa_name || mpesa_name === '') mpesa_name = 'n/a';

		if (mobile_num) {
			Partners.upsert({mobile_num}, {$set: {mpesa_name, mobile_num}}); 
		}

	});

};

module.exports = { countActivations, readActivationsFile, activation_aggregates, createPartners };





