import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

import config from '../../config/incrementer-auth';

class SignIn extends Component {
  render() {
    return (
      <GoogleLogin
        clientId={config.GoogleClientId}
        buttonText='Sign in with Google'
        onSuccess={response => this.props.onSuccess(response)}
        onFailure={response => this.props.onFailure(response)}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

export default SignIn;
