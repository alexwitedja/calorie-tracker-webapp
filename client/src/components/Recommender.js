import React, { Component } from 'react'
import NavBar from './NavBar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/paper';
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
    minWidth:'120px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class Recommender extends Component {
  constructor() {
    super();
    this.state = {
      age: '',
      gender: '',
      height: '',
      weight: '',
      exercise: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    }, () => console.log(this.state));
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
                >
                  Submit
                </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4">
                  According to your information you should eat:
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                >
                  Save preference
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Recommender)