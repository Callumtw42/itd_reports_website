import TestRoute from "./testroute"
import "./sandbox.scss"
import './App.scss';
import 'typeface-roboto';
import Container from "@material-ui/core/Container"
import useStyles from './style'
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SandBox from "./sandbox"

import Login from './components/pages/login/login';
import Reports from './components/pages/reports/reports';

function App() {
  const classes = useStyles()
  document.body.style.zoom = "1.0"
  return (
    <div className={classes.app} >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta name="viewport" content="width=device-width"/>

      <Router>
        <Route path="/reports" exact={true} render={props => {
          if (!localStorage.id) { props.history.replace("/")} else return <Reports {...props} />
        }} />

        <Route path="/" exact={true} render={(props) => <Login {...props} />} />
      </Router>

    </div >
  );
}

export default App;
//