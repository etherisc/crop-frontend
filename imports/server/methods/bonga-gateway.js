const axios = require('axios');
const FormData = require('form-data');


const baseURL = 'https://app.bongasms.co.ke/api/';
const apiClientID = '338';
const key = 'm3fFvqHakNppHOw';
const secret = 'yjokfBb6IQvAmVkiRAvpp9050gaZMD';
const serviceID = '4849';

const bongaApi = Meteor.wrapAsync(function ({method='get', url = 'send-sms-v1', args = {}}, cb) {

	info('bonga request', {url, args});

	let config;

	if (method === 'get') {

		args.apiClientID = apiClientID;
		args.key = key;
		args.secret = secret;

		config = {
			method,
			url,
			baseURL,
			params: args
		};

	} else if (method === 'post') {

		data = new FormData();
		data.append('apiClientID', apiClientID);
		data.append('key', key);
		data.append('secret', secret);

		Object.keys(args).forEach(item => {
			data.append(item, args[item]);
		});
		config = {
			method,
			url,
			baseURL,
			data,
			headers: {
				...data.getHeaders()
			}
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
			message = `bongaApi received status ${err.response.status}`;
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

const bongaFetchDeliveryReport = (_id) => {

	try {

		const sms = Sms.findOne({_id});
		
		if (!('amount' in sms) sms.amount = 0.0;

		const url = sms.amount > 0.0 ? 'b2c-trx-status' : 'fetch-delivery';

		const response = bongaApi({
			method: 'get',
			url,
			args: {
				sms.unique_id
			}
		});

		info(`SMS Delivery Report ${unique_id}`, response.data);

		if (response.data.status === 222) {


			if ('delivery_status_desc' in response.data) {

				Sms.upsert({_id}, {$set: {
					delivery_status_desc: response.data.delivery_status_desc,
					date_received: response.data.date_received
				}});

			} else {

				Sms.upsert({_id}, {$set: {
					delivery_status_desc: response.data.status_message,
					operator_cost: response.data.operator_cost,
					transaction_cost: response.data.transaction_cost,
					total_cost: response.data.total_cost,
					transaction_status: response.data.transaction_status
				}});


			}
		} else {
			error(`Error fetching Delivery Report, unique_id=${data.unique_id}`, {
				status: response.status, 
				statusText: response.statusText, 
				data: response.data
			});
		}

	} catch(err) {
		error('Error receiving SMS Delivery Report', {message: err.message, stack: err.stack});
		Sms.upsert({_id}, {$set: { status: 999, status_message: err.message}});
	};
};

const bongaSMS = ({mobile_num, message, amount = 0.0}) => {

	const _id = Sms.insert({
		timestamp: Date.now(), 
		mobile_num, 
		message, 
		status: 0, 
		status_message: 'sending...',
		amount
	});

	try {

		const url = amount > 0.0 ? 
			  '/b2c-send-money' : 
		'/send-sms-v1';
		const args = amount > 0.0 ? {
			mobile: mobile_num, 
			message, 
			amount, 
			smsServiceID: serviceID
		} : {
			MSISDN: mobile_num, 
			txtMessage: message, 
			serviceID
		};
		const response = bongaApi({
			method: 'post', 
			url, 
			args
		});

		if (response.data.status === 222) {
			Sms.upsert({_id}, {$set: {
				status: response.data.status, 
				status_message: response.data.status_message, 
				unique_id: response.data.unique_id, 
				timestamp: Date.now(), 
				credits: response.data.credits
			}});

			bongaFetchDeliveryReport(_id);
			return `SMS successfully sent, number: ${mobile_num}, message: ${message}, amount: ${amount}`;

		} else if (response.data.status === 666) {
			Sms.upsert({_id}, {$set: { status: response.data.status, status_message: response.data.status_message }});
		} else {
			Sms.upsert({_id}, {$set: { status: 998, status_message: 'Unknown Gateway Error' }});
		};
	} catch (err) {
		error('Error sending SMS', {message: err.message, stack: err.stack});
		Sms.upsert({_id}, {$set: { status: 999, status_message: err.message}});
	}
	return `Error sending SMS; number: ${mobile_num}, message: ${message}, amount: ${amount}`;
}

module.exports = { bongaApi, bongaSMS, bongaFetchDeliveryReport };
