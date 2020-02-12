import React, { Component } from 'react';

import config from '../../config/incrementer-integers';
const { ApiGatewayRestApi, Region, Stage } = config;

class SignedIn extends Component {
  render() {
    return (
      <div>
        <h3>Hello, {this.props.user}! 👋</h3>
        <hr />
        <p>Your API key is:</p>
        <code>{this.props.apiKey}</code>
        <hr />
        <p>To get the current integer:</p>
        <code>curl https://{ApiGatewayRestApi}.execute-api.{Region}.amazonaws.com/{Stage}/current -H "Authorization: Bearer {this.props.apiKey}"</code>
        <hr />
        <p>To get the next integer:</p>
        <code>curl https://{ApiGatewayRestApi}.execute-api.{Region}.amazonaws.com/{Stage}/next -H "Authorization: Bearer {this.props.apiKey}"</code>
        <hr />
        <p>To set a new current integer:</p>
        <code>curl -X "PUT" https://{ApiGatewayRestApi}.execute-api.{Region}.amazonaws.com/{Stage}/current --data "current=[new integer]" -H "Authorization: Bearer {this.props.apiKey}"</code>
        <hr />
      </div>
    );
  }
}

export default SignedIn;
