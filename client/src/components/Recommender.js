import React, { Component } from 'react'
import NavBar from './NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RecommenderService from '../services/RecommenderService';
import AuthenticationService from '../services/AuthenticationService';


const useStyles = theme => ({
  image: {
    backgroundImage: 'url(https://cdn1.vectorstock.com/i/1000x1000/03/95/food-background-italian-menu-with-space-for-text-vector-4410395.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vw',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: 'black',
    marginTop: '20px',
    height: '40vw'
  },
  formControl: {
    minWidth: '120px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  pref: {
    textAlign: 'center',
    marginTop: '20px',
  },
  message:{
    position: 'relative',
    top: '44%',
    textAlign: 'center',
  },
  table: {
    marginTop: '20px',
  }
});

class Recommender extends Component {
  constructor() {
    super();
    this.state = {
      age: '25',
      gender: 'male',
      height: '180',
      weight: '65',
      exercise: 'Active',
      errormssg: '',
      kcals: [],
      pref: '',
      updateGoal: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRecommend = this.handleRecommend.bind(this)
    this.handlePref = this.handlePref.bind(this)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleRecommend = () => {
    let weight = parseInt(this.state.weight, 10);
    let height = parseInt(this.state.height, 10);
    let age = parseInt(this.state.age, 10);

    RecommenderService.calculateMifflin(weight, height, age, this.state.gender, this.state.exercise)
      .then(res => {
        this.setState({
          kcals: res.data.weight
        })
      }, err => {
        this.setState({ errmssg: 'uh oh something went wrong' }, () => {
          console.log(this.state.errormssg);
        });
      });
  }

  handlePref = () => {
    const email = sessionStorage.getItem('authenticatedUser')
    const pref = parseInt(this.state.pref, 10);

    RecommenderService.sendPref(email, pref)
      .then(res => {
        alert('Update successful!');
      }, err => {
        alert('Update failed! Please try again.');
      })
  }

  componentDidMount() {
    const email = sessionStorage.getItem('authenticatedUser')
    console.log(email);
    RecommenderService.getGoal(email)
      .then(res => {
        this.setState({
          updatedGoal: res.data.goal
        });
      }, err => {
        alert('Failure')
      });
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.image}>
        <NavBar page='Recommender' />
        <Container width="75%">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4">
                  Enter your information:
                </Typography>
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="age"
                    label="Age (15-80) "
                    name="age"
                    autoComplete="25"
                    required
                    autoFocus
                    onChange={this.handleInputChange}
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="height"
                    label="Height (cm) e.g 180"
                    name="height"
                    autoComplete="180"
                    required
                    type="number"
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="weight"
                    label="Weight (kg) e.g 65"
                    name="weight"
                    autoComplete="65"
                    required
                    type="number"
                    onChange={this.handleInputChange}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="exercise-simple">Exercise</InputLabel>
                    <Select
                      onChange={this.handleInputChange}
                      value={this.state.exercise}
                      inputProps={{
                        name: 'exercise',
                        id: 'exercise-simple',
                      }}
                    >
                      <MenuItem value='Light'>Light</MenuItem>
                      <MenuItem value='Moderate'>Moderate</MenuItem>
                      <MenuItem value='Active'>Active</MenuItem>
                      <MenuItem value='Very Active'>Very Active</MenuItem>
                      <MenuItem value='Extra active'>Extra active</MenuItem>
                    </Select>
                  </FormControl>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleRecommend}
                  >
                    Submit
                </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {
                  this.state.kcals.length === 0 ?
                  <Typography variant="h3" className={classes.message}>
                    {
                      this.state.updatedGoal ? 
                      <div>Your current goal: {this.state.updatedGoal} Use recommender for other options</div> 
                      : 
                      <div>Please fill in form to use recommender</div>
                    }
                  </Typography>
                  :
                  <>
                    <Typography variant="h4">
                    According to your information you should eat:
                    </Typography>
                    <Table className={classes.table} size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell component="th" scope="row">Goal</TableCell>
                          <TableCell align="right">Calories/Day</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.kcals.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.type}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => {this.setState({ pref:row.kcal })}}
                              >
                                {row.kcal}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {
                      this.state.pref && <div className={classes.pref}>
                        <Typography>You selected: {this.state.pref}</Typography>
                      </div>
                    }
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      fullWidth
                      onClick={this.handlePref}
                    >
                      Save preference
                    </Button>
                  </>
                }
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Recommender)