const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
AWS.config.update({
  accessKeyId:  keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: "us-east-1"
});
const s3 = new AWS.S3();

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'test-bucket-3535',
        ContentType: 'image/jpeg',
        Key: key
      },
      
      (err, url) => {
        console.log(url)
        res.send({ key, url })
      }
    );
  });
};
