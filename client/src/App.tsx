import { Security, SecureRoute, ImplicitCallBack, LoginCallback } from '@okta/okta-react'
import './App.scss';
import 'typeface-roboto';

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import  Login  from './modules/pages/home/login'
import Reports from './modules/pages/reports';
// import Login from "./modules/auth/Login"
import { useOktaAuth } from '@okta/okta-react'
// function onAuthRequired({ history }) {
//   history.push("/login")
// }

const config = {
  issuer: 'https://dev-295079.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oad0va95K3KATM5t4x6',
  pkce: true
};


function App() {

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App" >
        <meta name="viewport" content="width=1000"></meta>
        <Router>
          <Route path="/" exact={true} render={props => <Login {...props} />} />
          <Route path="/reports" exact={true} render={props => <Reports {...props} />} />
        </Router>
      </div>
    </div >
  );
}

export default App;
