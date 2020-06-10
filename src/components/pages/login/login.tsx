import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import "./style.scss"

import Copyright from './copyright';
import useLogin from './logic';
import { useStyles } from './style';

export default function Login(props: RouteComponentProps) {
  const classes = useStyles();
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
          onChange={e => setUsername(e.target.value)}
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
      <Typography className={classes.error}>{data.toString()}</Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.submit}
        onClick={login.bind(this, username, password, props)}
      >
        Sign In
          </Button>
    </>
  }

  return (<div className="Login">
    <Spinner>
      <Paper className={classes.papersurround}>
        <Container component="main" maxWidth="xs" className={classes.paper}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img className="logo" src='ITDlogo.jpg' alt='logo'></img>
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <Field />
            <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
              </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>

      </Paper >
    </Spinner>
  </div>
  );
}