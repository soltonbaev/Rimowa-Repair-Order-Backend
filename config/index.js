import s3 from './s3.config';

export default {
  port: process.env.API_PORT,
  awsS3Config: s3.awsS3Config,
  s3bucket: s3.s3bucket,
  fakeS3Host: s3.fakeS3Host,
  fakeS3Port: s3.fakeS3Port,
  postgres: {
    database: process.env.TEST_MODE ? 'test' : process.env.SQL_DB,
    username: process.env.SQL_USER,
    password: process.env.SQL_PASS || '',
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
