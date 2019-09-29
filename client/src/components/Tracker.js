import React, { Component } from 'react'
import NavBar from './NavBar'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = theme => ({
  image: {
    backgroundImage: 'url(https://cdn1.vectorstock.com/i/1000x1000/03/95/food-background-italian-menu-with-space-for-text-vector-4410395.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '50vw',
  },
  container: {
    marginTop: '20px',
    textAlign: 'center'
  },
  input: {
    height:'30vw',
    padding: '10px',
  },
  graph: {
    height:'40vw'
  }
})

class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      food: '',
      amount: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitFood = this.submitFood.bind(this)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  submitFood = (event) => {
    let { food, amount } = this.state
    let data = {
      food,
      event
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.image}>
        <NavBar page='Tracker' />
        <Container width="80%" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper className={classes.input}>
                <Typography variant="h6">
                  Enter kCals one by one
                </Typography>
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="food"
                    label="Enter food"
                    name="food"
                    autoComplete="Apple"
                    required
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Amount (grams) e.g 100"
                    name="amount"
                    autoComplete="100"
                    required
                    type="number"
                    onChange={this.handleInputChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.submitFood}
                  >
                    Submit
                  </Button>
                </div>
                <br />
                <Typography>
                  Or go to calculator page to enter many
                </Typography>
                <br />
                <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                component="a"
                href="/calculator"
                >
                  Go to calculator
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.graph}>
                <Typography variant="h5">
                  This is your progress this week
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Tracker)
