import { callApi } from '/imports/server/methods/call-api.js';


const runContractReview = ({bucketName, accessKey, secretKey, folder, siteTableFile, jobId, seasonId}) => {

	const api_url = 'localhost:8181/api/v1';
	const minioHost = 'localhost';
	const minioPort = '9000';
	const mongoHost = 'localhost';
	const mongoPort = '3101';
	const mongoDb = 'meteor';
	
	const tenant = 'acre';
	const env = 'test';
	const getApiUrl = (endpoint) => `${api_url}/${endpoint}?tenant=${tenant}&env=${env}`;

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
				},
				s3: {
					access_id: accessKey, 
					access_secret: secretKey, 
					host: minioHost,
					port: minioPort,
					resource: bucketName
				}
			}
		});
		info('runContractReview buckets', response);

		response = callApi({
			method: POST, 
			url: seasonsUrl, 
			args: {
				folder_name: folder,
				id: id,
				site_table_file: siteTableFile
			}
		});
		info('runContractReview seasons', response);

		response = callApi({
			method: POST, 
			url: calculationsUrl, 
			args: {
				job_id: 'run-22';
				season_data_id: id
			}
		});
		info('runContractReview calculations', response);

		return(`Calculation ID: ${response.data}`);

	} catch (err) {
		error('runContractReview Error', {message: err.message, stack: err.stack})

	}


};

module.exports = { runContractReview };