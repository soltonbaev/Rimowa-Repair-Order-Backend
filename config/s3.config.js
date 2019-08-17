let awsS3Config = null;
let s3bucket = null;
let fakeS3Port = null;
let fakeS3Host = null;

if (process.env.TEST_MODE === '1') {
  fakeS3Host = 'localhost';
  fakeS3Port = 4569;

  awsS3Config = {
    accessKeyId: 'secret',
    secretAccessKey: 'secret',
    endpoint: `http://${fakeS3Host}:${fakeS3Port}`,
    sslEnabled: false,
    s3ForcePathStyle: true,
  };

  s3bucket = 'bucket';
} else {
  awsS3Config = {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
  };

  s3bucket = process.env.AWS_S3_BUCKET;
}

export default {
  awsS3Config,
  s3bucket,
  fakeS3Host,
  fakeS3Port,
};
