import React, { Component } from 'react';
import './App.css';

import SignInContainer from './components/SignIn/SignInContainer';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Incrementer.</h1>
          <SignInContainer />
        </header>
      </div>
    );
  }
}

export default App;
