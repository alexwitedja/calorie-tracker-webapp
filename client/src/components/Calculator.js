import React, { Component } from 'react'
import NavBar from './NavBar'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CalculatorService from '../services/CalculatorService'
import SearchService from '../services/SearchService'

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
  },
  search: {
    height: '20vw',
    padding: '10px'
  },
  total: {
    height: '17vw',
    padding: '10px'
  },
  show: {
    height: '40vw',
    padding: '10px'
  },
  container: {
    marginTop: '20px',
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  record: {
    marginTop: '10%',
  }
})

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      total: '0',
      foods: [],
      food: '',
      amount: '',
      todayCal: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitFood = this.submitFood.bind(this)
    this.handleTrack = this.handleTrack.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.todayTotal = this.todayTotal.bind(this)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  calculateTotal() {
    let sum = 0;
    this.state.foods.map(food => {
      sum += food.calories
    });

    this.setState({
      total: sum
    })
  }

  submitFood = (event) => {
    let { food, amount } = this.state

    SearchService.searchFood(food)
    .then(res => {
      if(res.data.foodData.msg === null) {
        var calories = parseInt((res.data.foodData.energy * (amount/100)) / 4.184, 10)
        let data = {
          name: food,
          amount,
          calories
        }
        this.setState({
          foods: this.state.foods.concat(data)
        }, this.calculateTotal)
      } else {
        alert('Food not found');
      }
    }, err =>{
      alert('Food not found');
    })
  }

  todayTotal(){
    let email = sessionStorage.getItem('authenticatedUser')
    console.log('hi')
    CalculatorService.getCalToday(email)
      .then(res => {
        this.setState({
          todayCal: res.data.sum
        })
      }, err => {
        alert('Uh oh something is wrong')
      })
  }
  
  handleTrack() {
    let email = sessionStorage.getItem('authenticatedUser')
    CalculatorService.trackCalories(email, this.state.total)
      .then(res => {
        this.todayTotal();
        this.setState({ foods: [], total: '0' });
      }, err => {
        alert('something is not right');
      });
  }

  componentDidMount() {
    this.todayTotal();
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.image}>
        <NavBar page='Calculator' />
        <Container width="80%" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container justify="flex-end" direction="column" spacing={3}>
                <Grid item>
                  <Paper className={classes.search}>
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
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.total}>
                    <Typography variant="h4">
                      Total calories:
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      {this.state.total}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.record}
                      onClick={this.handleTrack}
                    >
                      Record this
                    </Button>
                    <Typography variant="h5">
                      Today you've eaten: {this.state.todayCal} calories
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.show}>
                {this.state.foods.length === 0 ?
                  <Typography variant="h3">
                    Please enter some foods
                  </Typography>
                  :
                  <>
                    <Typography variant="h4">
                      Foods you've entered:
                    </Typography>
                    <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Foods</TableCell>
                        <TableCell align="right">Amount&nbsp;(g)</TableCell>
                        <TableCell align="right">calories</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.foods.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.amount}</TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

export default withStyles(useStyles)(Calculator)