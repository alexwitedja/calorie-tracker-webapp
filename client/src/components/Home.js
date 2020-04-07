import React, { Component } from 'react'
import NavBar from './NavBar'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chart from 'react-google-charts'

import AuthenticationService from '../services/AuthenticationService'
import RecommenderService from '../services/RecommenderService'
import CalculatorService from '../services/CalculatorService'
import SearchService from '../services/SearchService'

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
      goal: '',
      todayCal: '0',
      data: [],
      options: {
        legend: { position: "bottom"},
      },
      food: '',
      foodInfo: '',
    }
    
    this.setupPage = this.setupPage.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchFood = this.searchFood.bind(this);
  }
  
  searchFood() {
    let { food } = this.state
    SearchService.searchFood(food)
      .then(res => {
        if(res.data.foodData.msg === null) {
          this.setState({
            foodInfo: res.data.foodData
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

  setupPage() {
    if(AuthenticationService.isUserLoggedIn) {
      this.setState({
        username: sessionStorage.getItem('authenticatedUser') 
      }, () => {
        RecommenderService.getGoal(this.state.username)
          .then(res => {
            this.setState({
              goal: res.data.goal
            });
          }, err => {
            alert('failure');
          });
        CalculatorService.getCalToday(this.state.username)
          .then(res => {
            this.setState({
              todayCal: res.data.sum
            })
          }, err => {
            alert('Uh oh something is wrong')
          })
      });
    };
  }

  componentDidMount() {
    this.setupPage()
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
                    {this.state.goal ? 
                    <Typography variant="h5">
                      {this.state.todayCal} calories <br />
                      Your goal is {this.state.goal} calories
                    </Typography>
                    :
                    <Typography variant="h5">
                      To setup goal go to calorie recommender.
                    </Typography>
                    }
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5">
                  Calories this week:
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
                  name="food"
                  required
                  onChange={this.handleInputChange}
                />
                <div>
                  <Button 
                    variant="contained"
                    color="primary"
                    onClick={this.searchFood}
                  >
                    Search                  
                  </Button>
                </div>
                { this.state.foodInfo !== '' &&
                  <>
                    <Typography variant="h5">
                      {this.state.food}'s information every 100g
                    </Typography>
                    <ul>
                      <li>Energy: {parseInt(this.state.foodInfo.energy / 4.184, 10)} calories</li>
                      <li>Protein: {this.state.foodInfo.protein} g</li>
                      <li>Fat: {this.state.foodInfo.fat} g</li>
                    </ul>
                  </>
                }
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home)