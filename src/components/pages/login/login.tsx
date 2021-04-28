import './style.scss';

import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { host } from "../../utils"

import Copyright from './copyright';
import useLogin from './logic';

export default function Login(props: RouteComponentProps) {
  const { login, data, Spinner } = useLogin()

  function Field() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return <>
      <form onSubmit={login.bind(this, username, password, props)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
      </form>

      <form onSubmit={login.bind(this, username, password, props)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <Typography className="error">{data.toString()}</Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="submit"
        onClick={login.bind(this, username, password, props)}
      >
        Submit
          </Button>
    </>
  }

  return (<div className="Login">
    <Spinner>
      <Paper className="papersurround">
        <Avatar className="avatar">
          <img className="logo" src='ITDlogo.jpg' alt='logo'></img>
        </Avatar>
        <Typography className="signin" component="h1" variant="h5">
          Sign in
        </Typography>
        <Field />
        <form className="form" noValidate>
          <Grid container>
            <Grid item xs>
            </Grid>
          </Grid>
        </form>
        <Copyright />

      </Paper >
    </Spinner>
  </div>
  );
}