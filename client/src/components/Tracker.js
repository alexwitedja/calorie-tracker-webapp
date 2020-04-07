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
import Chart from 'react-google-charts'

import CalculatorService from '../services/CalculatorService'
import RecommenderService from '../services/RecommenderService'
import SearchService from '../services/SearchService'

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
  },
  submit: {
    marginLeft: '10px'
  }
})

class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      food: '',
      amount: '',
      calorie: '',
      data: [],
      goal: '',
      options: {
        legend: { position: "bottom"},
      },
      today: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitFood = this.submitFood.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.recordFood = this.recordFood.bind(this)
  }

  submitFood = (event) => {
    let { food, amount } = this.state
    
    SearchService.searchFood(food)
    .then(res => {
      if(res.data.foodData.msg === null) {
        var calories = parseInt((res.data.foodData.energy * (amount/100)) / 4.184, 10)
        this.setState({
          calorie: calories
        })
      } else {
        alert('Food not found');
      }
    }, err =>{
      alert('Food not found');
    })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  recordFood() {
    let email = sessionStorage.getItem('authenticatedUser');

    CalculatorService.trackCalories(email, this.state.calorie)
      .then(res => {
        this.fetchData()
      }, err => {
        alert('something is wrong')
      })
  }

  fetchData() {
    let email = sessionStorage.getItem('authenticatedUser');
    CalculatorService.getData(email)
      .then(res => {
        this.setState({
          data: res.data.data
        });
      }, err => {
        alert('something is not right');
      })
  }

  componentDidMount() {
    this.fetchData();
    let email = sessionStorage.getItem('authenticatedUser');
    RecommenderService.getGoal(email)
      .then(res => {
        this.setState({
          goal: res.data.goal
        })
      }, err => {
        alert('something is not right');
      })
    CalculatorService.getCalToday(email)
      .then(res => {
        this.setState({
          today: res.data.sum
        })
      })
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
                  Enter calories one by one
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
                  { this.state.calorie && 
                    <Typography variant="h5">
                      That's {this.state.calorie} calories
                    </Typography>
                  }
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.submitFood}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.recordFood}
                  >
                    Record
                  </Button>
                </div>
                <br />
                <Typography>
                  Or go to calculator page to enter in bulk
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
                <Typography variant="h4">
                  Your progress this week:
                </Typography>
                {
                  this.state.data.length > 0 && 
                  <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={this.state.data}
                  options={this.state.options}
                  />
                }
                <Typography variant="h4">
                  Your Goal is: {this.state.goal} calories/day
                </Typography>
                <Typography variant="h4">
                  You've eaten: {this.state.today} calories today
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
