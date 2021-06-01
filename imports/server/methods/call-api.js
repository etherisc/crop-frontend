
const axios = require('axios');

const callApi = Meteor.wrapAsync(function ({method = 'get', url, args = {}}, cb) {

	
	axios({
		method,
		url,
		data: args
	})
	.then(function (response) {
		cb(null, response);
	})
	.catch(function (error) {
		let message = '';
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			message = `callApi received status ${error.response.status}`;
			error(, error.toJson());
			cb(, null);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			message = `callApi: no response`;
		} else {
			// Something happened in setting up the request that triggered an Error
			message = `callApi: Invalid request (${error.message})`;
		}
		error(message, error.toJson());
		cb(message, null);
	});	

});


module.exports = { callApi }
				  