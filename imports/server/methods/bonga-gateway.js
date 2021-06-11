const axios = require('axios');


const baseUrl = 'https://app.bongasms.co.ke/api/';
const apiClientID = '338';
const key = 'm3fFvqHakNppHOw';
const secret = 'yjokfBb6IQvAmVkiRAvpp9050gaZMD';
const serviceID = '4849';

const bongaApi = Meteor.wrapAsync(function ({method='get', endpoint = 'send-sms-v1', args = {}}, cb) {
	
	info('bonga request', {endpoint, args});
	
	let config;
	
	if (method === 'get') {
		
		config = {
			method,
			endpoint,
			url,
			params: args
		};
		
	} else if (method === 'post') {
		
		data = new FormData();
		data.append('apiClientID', apiClientId);
		data.append('key', key);
		data.append('secret', secret);

		Object.keys(args).forEach(item => {
			data.append(item, args[item]);
		});
		
		config = {
			method,
			endpoint,
			url,
			data,
			headers: { "Content-Type": "multipart/form-data" }
		};
			
	} else {
		error(`bongaApi: Invalid Method ${method}`, {endpoint, args});
	};
	
	axios(config)
	.then(function (response) {
		const { status, statusText, headers, data } = response;
		info('bongaApi response', {status, statusText, headers, data});
		cb(null, {status, statusText, headers, data});
	})
	.catch(function (err) {
		let message = '';
		if (err.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			if (err.response.status === 666) { // we handle this as valid response
				const { status, statusText, headers, data } = response;
				info('bongaApi response', {status, statusText, headers, data});
				cb(null, {status, statusText, headers, data});
			} else {
				message = `bongaApi received status ${err.response.status}`;
			}
		} else if (err.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			message = `bongaApi: no response`;
		} else {
			// Something happened in setting up the request that triggered an Error
			message = `bongaApi: Invalid request (${err.message})`;
		}
		error(message, {message: err.message, stack: err.stack});
		cb(message, null);
	});	

});

const bongaFetchDeliveryReport = ({_id, unique_id}) => {
	return bongaApi({
		method: 'get',
		endpoint: 'fetch-delivery',
		unique_id
	});
};

const bongaSMS = ({mobile_num, message}) => {
	const _id = Sms.insert({
		timestamp: Date.now(), 
		mobile_num, 
		message, 
		status: 0, 
		status_message: 'sending...'
	});
	try {
		const {status, statusText, headers, data} = bongaApi({
			method: 'post', 
			endpoint: 'send-sms-v1', 
			args: {
				MSISDN: mobile_num, 
				txtMessage: message, 
				serviceID
			}
		});
		if (status === 222) {
			Sms.upsert({_id}, {$set: {
				status, 
				status_message: data.status_message, 
				unique_id: data.unique_id, 
				timestamp: Date.now(), 
				credits: data.credits
			}});
			const {status, statusText, headers, data} = bongaFetchDeliveryReport({_id, unique_id: data.unique_id});
			if (status === 222) {
				Sms.upsert({_id}, {$set: {
					delivery_status_desc: data.delivery_status_desc,
					date_received: data.date_received
				}});
			} else {
				error(`Error fetching Delivery Report, unique_id=${data.unique_id}`, {status, statusText, headers, data});
			}
			// even if we cannot fetch Deliver Report, we consider the SMS as delivered
			return 'SMS successfully sent';

		} else if (status === 666) {
			Sms.upsert({_id}, {$set: { status, status_message: data.status_message }});
		} else {
			Sms.upsert({_id}, {$set: { status: 998, status_message: 'Unknown Gateway Error' }});
		};
	} catch (error) {
		Sms.upsert({_id}, {$set: { status: 999, status_message: 'Unknown Gateway Error'}});
	}
	return 'Error sending SMS';
}

const bongaSendMoney = ({mobile, message, amount}) => {
	const response = bongaApi({
		method: 'post', 
		endpoint: 'b2c-send-money', 
		args: {
			mobile: mobile_num, 
			message, 
			amount, 
			smsServiceID: serviceID
		}});
};


module.exports = { bongaApi, bongaSMS, bongaSendMoney };
				  