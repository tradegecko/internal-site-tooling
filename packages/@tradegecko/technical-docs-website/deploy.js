module.exports = function(deployTarget) {
  var ENV = {
    pipeline: {
      activateOnDeploy: true
    }
  };
  console.log('looool')
  console.log(process.env.AWS_ACCESS_KEY_ID)
  ENV['s3'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'testable-bucket',
    region: 'us-east-1'
  };

  ENV['s3-index'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'testable-bucket',
    region: 'us-east-1'
  };
  return ENV;
};
