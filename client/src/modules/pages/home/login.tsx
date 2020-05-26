import useLogin from "./uselogin"
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { RouteComponentProps } from 'react-router-dom';
import { Paper } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://itdsoftware.com/">
        ITD Software
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  papersurround: {
    margin: "auto",
    width: "500px"
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "#004064",
    width: "100px",
    height: "100px"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
    background: "#004064",
  },
  error: {
    color: "red"
  }
}));

export default function Login(props: RouteComponentProps) {
  const classes = useStyles();
  const { login, data, password, setPassword, username, setUsername } = useLogin()

  if (data[0] && data[0]["id"]) props.history.push(`/reports`)

  return (

    <Paper className={classes.papersurround}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
            <img src='ITDlogo.jpg' alt='logo'></img>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={classes.form} noValidate>
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
              onChange={(e) => setUsername(e.target.value)}
            />
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Typography className={classes.error}>{data.toString()}</Typography>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              // color="secondary"
              className={classes.submit}
              onClick={login.bind(this, username, password)}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>

    </Paper >
  );
}