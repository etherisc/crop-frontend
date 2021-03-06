import { callApi } from '/imports/server/methods/call-api.js';


const runContractReview = ({bucketName, accessKey, secretKey, folder, siteTableFile, jobId, seasonId}) => {

	const apiUrl = 'http://localhost:8181/api/v1';
	const minioHost = 'localhost';
	const minioPort = 9000;
	const mongoHost = 'localhost';
	const mongoPort = 3101;
	const mongoDb = 'meteor';
	const mongoTimeout = 1000;
	const minioTimeout = 1000;
	const arc2Resource = 'arc2/rainfall';
	const arc2Host = 'localhost';
	const arc2Port = 5000;
	const arc2Timeout = 5000;
	
	const tenant = 'acre';
	const env = 'test';
	const getApiUrl = (endpoint) => `${apiUrl}/${endpoint}?tenant=${tenant}&env=${env}`;

	const configUrl = getApiUrl('config');
	const seasonsUrl = getApiUrl('seasons');
	const calculationsUrl = getApiUrl('calculations');
	const POST = 'post';

	try {

		let response; 

		response = callApi({
			method: POST, 
			url: configUrl, 
			args: {
				mongo: {
					host: mongoHost,
					port: mongoPort,
					resource: mongoDb,
					timeout: mongoTimeout
				},
				s3: {
					access_id: accessKey, 
					access_secret: secretKey, 
					host: minioHost,
					port: minioPort,
					resource: bucketName,
					timeout: minioTimeout
				},
				arc2: {
					host: arc2Host,
					port: arc2Port,
					resource: arc2Resource,
					timeout: arc2Timeout
				}
			}
		});
		info('runContractReview buckets', response);

		response = callApi({
			method: POST, 
			url: seasonsUrl, 
			args: {
				folder_name: folder,
				id: seasonId,
				site_table_file: siteTableFile
			}
		});
		info('runContractReview seasons', response);

		response = callApi({
			method: POST, 
			url: calculationsUrl, 
			args: {
				job_id: jobId,
				season_data_id: seasonId
			}
		});
		info('runContractReview calculations', response);

		return(`Calculation ID: ${response.data}`);

	} catch (err) {
		error('runContractReview Error', {message: err.message, stack: err.stack})
		throw new Meteor.Error(err.message);
	}


};

module.exports = { runContractReview };