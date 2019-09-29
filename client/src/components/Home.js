import React, { Component } from 'react'
import NavBar from './NavBar'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import AuthenticationService from '../services/AuthenticationService'

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '10px',
    width: '80%',
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: 'black',
  },
  image: {
    backgroundImage: 'url(https://cdn1.vectorstock.com/i/1000x1000/03/95/food-background-italian-menu-with-space-for-text-vector-4410395.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vw'
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      
    }
  }

  componentDidMount() {
    if(AuthenticationService.isUserLoggedIn) {
      this.setState({
        username: sessionStorage.getItem('authenticatedUser') 
      });
    };
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.image}>
        <NavBar page='Home' />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4">
                      Welcome back!
                    </Typography>
                    <Typography variant="h5">
                      {this.state.username}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4">
                      Today you've consumed:
                    </Typography>
                    <Typography variant="h5">
                      3,000 kCals <br />
                      According to your goals you there's 5000 kCals more to go!
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5">
                  Calories this week:
                </Typography>
                Graph here
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5">
                  Quick ingredient search:
                </Typography>
                <TextField
                  variant="outlined"
                  id="searchBar"
                  label="Type an ingredient"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <Typography>
                  Food info here
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home)