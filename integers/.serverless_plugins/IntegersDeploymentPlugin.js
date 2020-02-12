const fs = require('fs');
const AWS = require('aws-sdk');

class IntegersDeploymentPlugin {
  constructor(serverless) {
    this.hooks = {
      'after:deploy:deploy': this.afterDeploy.bind(null, serverless)
    };
  }

  afterDeploy(serverless) {
    return new Promise(function (resolve, reject) {
      const provider = serverless.service.provider;
      const custom = serverless.service.custom;
      const service = serverless.service.service;

      const credentials = new AWS.SharedIniFileCredentials({ profile: provider.profile });
      const region = provider.region;
      const stage = custom.stage;
      const googleClientId = provider.environment.GOOGLE_CLIENT_ID;
      const cloudFormation = new AWS.CloudFormation({ credentials, region });

      const params = {
        StackName: `${service}-${custom.stage}`
      };

      cloudFormation.describeStackResources(params, function (err, response) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          const config = {
            Region: region,
            Stage: stage,
            ApiGatewayRestApi: response.StackResources.find(resource => resource.LogicalResourceId === 'ApiGatewayRestApi').PhysicalResourceId
          };
          const fileContents = `export default ${JSON.stringify(config)};`
          const path = custom.config_path;

          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }

          fs.writeFileSync(`${path}/${service}.js`, fileContents);
          return resolve(response);
        }
      });
    });
  }
}

module.exports = IntegersDeploymentPlugin;
