import { callApi } from '/imports/server/methods/call-api.js';



const runContractReview = ({api_url, minio_host, bucket, accesskey, secretkey, folder, site_table_file, id}) => {
	
	const bucketsUrl = `${api_url}/buckets`;
	const seasonsUrl = `${api_url}/seasons`;
	const calculationsUrl = `${api_url}/calculations`;
	const POST = 'post';
	
	try {
		
		let response; 
		
		response = callApi(POST, bucketsUrl, {
			accesskey, 
			secretkey, 
			host: minio_host, 
			name: bucket
		});
		info('runContractReview buckets', response);
		
		response = callApi(POST, seasonsUrl, {
			bucket_name: bucket,
  			folder_name: folder,
  			id,
			site_table_file
		});
		info('runContractReview seasons', response);
		
		response = callApi(POST, calculationsUrl, {
			season_data_id: id
		});
		info('runContractReview calculations', response);
		
	} catch (error) {
		error('runContractReview Error', {message: error.message, stack: error.stack})
		
	}
		
};


module.exports = { runContractReview };