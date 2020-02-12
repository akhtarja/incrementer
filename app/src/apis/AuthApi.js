import { PublicApiGateway } from './ApiGateway';

import config from '../config/incrementer-auth';
const { ApiGatewayRestApi, Region, Stage } = config;

const authApi = {
  loginSuccess(response) {
    const url = `https://${ApiGatewayRestApi}.execute-api.${Region}.amazonaws.com/${Stage}/process_login`
    const params = {
      id: response.profileObj.googleId,
      profile: response.profileObj
    };
    return PublicApiGateway.put(url, JSON.stringify(params))
  }
};

export default authApi;
