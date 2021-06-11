const axios = require('axios');


const baseUrl = 'https://app.bongasms.co.ke/api/';
const apiClientID = '338';
const key = 'm3fFvqHakNppHOw';
const secret = 'yjokfBb6IQvAmVkiRAvpp9050gaZMD';
const serviceID = '4849';

const bongaApi = Meteor.wrapAsync(function ({endpoint = 'send-sms-v1', args = {}}, cb) {
	
	info('bonga request', {endpoint, args});
	
	data = new FormData();
	data.append('apiClientID', apiClientId);
	data.append('key', key);
	data.append('secret', secret);
	
	Object.keys(args).forEach(item => {
		data.append(item, args[item]);
	});
	
	
	axios({
    	endpoint,
		url,
    	data,
		headers: { "Content-Type": "multipart/form-data" }
	})
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


const bongaSMS = ({mobile_num, message}) => {
	bongaApi({endpoint: 'send-sms-v1', args: {MSISDN: mobile_num, txtMessage: message, serviceID}});
}

const bongaSendMoney = ({mobile, message, amount}) => {
	bongaApi({endpoint: 'b2c-send-money', args: {mobile: mobile_num, message, amount, smsServiceID: serviceID}});
})	


module.exports = { bonga, bongaSMS, bongaSendMoney };
				  