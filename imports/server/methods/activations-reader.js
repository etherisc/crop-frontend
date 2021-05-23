/* Activations Reader */


const dataPath = '/opt/etherisc/acre-africa-data/2021-01/';

const fs = require('fs-jetpack');

const select = (obj, keys) => {
	
	let target = {};
	keys.forEach(item => target = Object.assign(obj[item], target));
	return target;
	
};



const readActivationsFile = () => {
	
	const act_content = fs.read(dataPath + 'insurance_activations.json');
	if (!act_content) {
		console.log('Activations file not found'); 
		return;
	}
	
	const act_json = JSON.parse(act_content);

	Activations.remove({import: '2021-01'});	
	
	let counter = 0;
	act_json.forEach(item => {
		
		const order_number = item.serial_number ? item.serial_number : (item.order_number ? item.order_number : null);
		
		if (!order_number) return;
		
		counter += 1;
		
		const { 
			mobile_no,
        	value_chain,
        	premium_amount,
        	voucher_code,
        	serial_number,
        	longitude,
        	latitude,
        	mpesa_ref,
        	mpesa_name,
        	date_activated
		} = item; 
		
		
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
					amount_premium: premium_amount,
					pixel: latLng2PixelStr({lat: Number(latitude), lng: Number(longitude)}),
					mpesa_ref,
					mpesa_name,
					import: '2021-01'					
				}
			}
		);
				
	});
	
	return counter;
}




module.exports = { readActivationsFile };





