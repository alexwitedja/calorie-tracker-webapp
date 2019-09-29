import React, { Component } from 'react';
import SignInSide from './components/SignInSide'
import Register from './components/Register'
import Home from './components/Home'
import Recommneder from './components/Recommender'
import Tracker from './components/Tracker'
import Calculator from './components/Calculator'
import withAuth from './withAuth'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={SignInSide}/>
          <Route path="/register" component={Register}/>
          <Route path="/home" component={withAuth(Home)} />
          <Route path="/recommender" component={withAuth(Recommneder)} />
          <Route path="/tracker" component={withAuth(Tracker)} />
          <Route path="/calculator" component={withAuth(Calculator)} />
        </Router>
      </div>
    );
  }
}

export default App;