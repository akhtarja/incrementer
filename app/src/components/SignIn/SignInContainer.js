import React, { Component } from 'react';
import authApi from '../../apis/AuthApi';
import SignIn from './SignIn';
import SigningIn from './SigningIn';
import SignedIn from './SignedIn';

class SignInContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      loading: false
    };

    this.successGoogle = this.successGoogle.bind(this);
    this.errorGoogle = this.errorGoogle.bind(this);
  }

  successGoogle(response) {
    this.setState({ loading: true });
    authApi.loginSuccess(response)
      .then(response => {
        this.setState({
          loading: false,
          signedIn: true,
          apiKey: response.data.apiKey,
          user: response.data.profile.givenName
        });
      })
      .catch(error => {
        console.error(JSON.stringify(error));
        this.setState({
          loading: false
        });
      });
  }

  errorGoogle(response) {
    console.error(response);
  }

  render() {
    return (
      <div>
        {this.signInContent()}
      </div>
    );
  }

  signInContent() {
    if (this.state.signedIn) {
      return (
        <SignedIn
          apiKey={this.state.apiKey}
          user={this.state.user}
        />
      );
    }

    if (this.state.loading) {
      return (
        <SigningIn />
      );
    }

    return (
      <SignIn
        onSuccess={this.successGoogle}
        onFailure={this.errorGoogle}
      />
    );
  }
}

export default SignInContainer;
