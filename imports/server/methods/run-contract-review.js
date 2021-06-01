import { callApi } from '/imports/server/methods/call-api.js';



const runContractReview = ({api_url, minio_host, bucket_name, accesskey, secretkey, folder, site_table_file, id}) => {

	const bucketsUrl = `${api_url}/buckets`;
	const seasonsUrl = `${api_url}/seasons`;
	const calculationsUrl = `${api_url}/calculations`;
	const POST = 'post';

	try {

		let response; 

		response = callApi({
			method: POST, 
			url: bucketsUrl, 
			args: {
				accesskey: accesskey, 
				secretkey: secretkey, 
				host: minio_host, 
				name: bucket_name
			}
		});
		info('runContractReview buckets', response);

		response = callApi({
			method: POST, 
			url: seasonsUrl, 
			args: {
				bucket_name: bucket_name,
				folder_name: folder,
				id,
				site_table_file
			}
		});
		info('runContractReview seasons', response);

		response = callApi({
			method: POST, 
			url: calculationsUrl, 
			args: {
				season_data_id: id
			}
		});
		info('runContractReview calculations', response);

	} catch (err) {
		error('runContractReview Error', {message: err.message, stack: err.stack})

	}

};

module.exports = { runContractReview };