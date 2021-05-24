var Minio = require('minio')

minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'accesskey',
    secretKey: 'secretkey'
});