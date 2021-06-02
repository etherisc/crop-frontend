
const axios = require('axios');

const callApi = Meteor.wrapAsync(function ({method = 'get', url, args = {}}, cb) {
	
	info('callApi request', {method, url, args});
	
	axios({
    	method,
		url,
    	data: args
	})
	.then(function (response) {
		info('callApi response', {status: response.status});
		console.log(response);
		cb(null, {status: response.status});
	})
	.catch(function (err) {
		let message = '';
		if (err.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			message = `callApi received status ${err.response.status}`;
		} else if (err.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			message = `callApi: no response`;
		} else {
			// Something happened in setting up the request that triggered an Error
			message = `callApi: Invalid request (${err.message})`;
		}
		error(message, {message: err.message, stack: err.stack});
		cb(message, null);
	});	

});


module.exports = { callApi }
				  