import TestRoute from "./testroute"
import "./sandbox.scss"
import './App.scss';
import 'typeface-roboto';
import Container from "@material-ui/core/Container"
import useStyles from './style'
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SandBox from "./sandbox"

import Login from './components/pages/login/login';
import Reports from './components/pages/reports/reports';

function App() {
  const classes = useStyles()
  document.body.style.zoom = "1.0"
  return (
    <div className={classes.app} >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta name="viewport" content="width=600, initial-scale=1 maximum-scale=1" />

      <Router>
        <Route path="/" exact={true} render={props => <Login {...props} />} />
        <Route path="/reports" exact={true} render={props => <Reports {...props} />} />
      </Router>

      {/* <Router>
        <Route path="/" exact={true} render={props => <TestRoute {...props} />} />
        <Route path="/sandbox" exact={true} render={props => <SandBox {...props} />} />
      </Router> */}

    </div >
  );
}

export default App;
//