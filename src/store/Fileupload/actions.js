import AWS from 'aws-sdk';

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:79de41e8-b5ea-415b-996b-de4fb71c50c1'
});
const bucketName = 'matefiles'; // Eter your bucket name
var bucket = new AWS.S3({
  params: {
    Bucket: bucketName
  }
});
export const FileAction = {
  upload: function(context, payload) {
    if (payload) {
      // need to send the foleder name in payload
      // TODO must get the logged in email for folder structure
      // var folder = payload.folder_name

      var objKey = payload.folder_name + '/' + payload.file.name;
      var params = {
        Key: objKey,
        ContentType: payload.file.type,
        Body: payload.file
      };

      bucket.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          context.commit('updateFiles', payload.file);
        }
      });
    }
  },
  delete: function(context, payload) {
    // payload is file name
    var params = {
      Key: payload
    };

    bucket.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
      /*
         data = {
         }
         */
    });
  }
};
