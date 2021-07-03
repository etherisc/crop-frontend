console.log('loading minio.js');

const Minio = require('minio')

minioClient = new Minio.Client({
	endPoint: 'localhost',
	port: 9000,
	useSSL: false,
	accessKey: 'accesskey',
	secretKey: 'secretkey'
});



const getMinioObject = Meteor.wrapAsync((bucket, filename, cb) => {

	let content = '';

	minioClient.getObject(bucket, filename, function(err, dataStream) {
		if (err) {
			cb(err, null);
		}
		if (dataStream) {
			dataStream.on('data', function(chunk) {
				content += chunk;
			})
			dataStream.on('end', function() {
				cb(null, content);
			})
			dataStream.on('error', function(err) {
				cb(err, null);
			})
		} else {
			cb(new Error('dataStream not provided'), null);
		}
	})

});


const putMinioObject = Meteor.wrapAsync((object, filename, cb) => {
	
	
	
});



module.exports = { getMinioObject };