import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthenticationService from '../services/AuthenticationService';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      backgroundImage: 'url(https://cdn1.vectorstock.com/i/1000x1000/03/95/food-background-italian-menu-with-space-for-text-vector-4410395.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  main: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    paddingBottom: '10px',
    position: 'relative',
    top: '6.5vw'
  }
});

class Register extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      justRegister: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Calorie Tracker
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    AuthenticationService.register(this.state.email, this.state.password)
      .then(res => {
        this.setState({
          justRegister: true
        })
      }, err => {
        alert('Error occured please use a different username')
      })
  }

  render() {
  const { classes } = this.props;
  const { justRegister } = this.state;

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      {(!justRegister) ? 
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleInputChange}
                autoComplete="fname"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                type="email"
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      :
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up Successful
        </Typography>
        <Grid container justify="center">
            <Grid item>
              <Link href="/" variant="body2">
                Click here to login
              </Link>
            </Grid>
        </Grid>
      </div>
      }
      <Box mt={5}>
        {this.Copyright.bind(this)}
      </Box>
    </Container>
  );
  }
}

export default withStyles(useStyles)(Register);