import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import './App.css';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import MovieSearch from './components/MovieSearch'
import Notfound from './notfound'
import Rentals from './components/Rentals'
import axios from 'axios';
import image from './images/frontpage.jpg'

const rentalURL = ''
class App extends Component {
  constructor() {
    super();
      this.state = {
        selectedCustomer: null,
        selectedRental: null,
        customerSearch: [],
      }
  }
  
  selectCustomer = (customerID) => {
    console.log('select Customer in App')
    this.setState({selectedCustomer: customerID})
  }

  selectRental =(movieTitle) => {
    console.log(movieTitle);
    this.setState({movieTitle: movieTitle})
  }

  showHomePage() {
    return (
      <div className="container">
        <h1>Rewind Movies</h1>
          <img src={image} alt="theater"/>
      </div>
    )
  }
  
  render() {
    return (
      <Router>
        <div className="App-header">
          <ul className="nav-menu">
            <li className="nav-link">
              <Link to="/">Rewind Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="/customers">Customer Registry</Link>
            </li>
            <li> 
              <Link to="/rental">Movie Rentals </Link>
            </li>
          </ul>
      </div>
        <Switch>
          <Route exact path="/" render={() => (this.showHomePage())}/> />
          <Route path="/movies" component={Library} />
          <Route path="/customers" render={ (props) => (<CustomerList {...props} selectCustCallback={this.selectCustomer}/>)} />
          <Route path="/rental" render={ (props) => (
            <Rentals {...props} 
              customerID={this.state.selectedCustomer}
              movie={this.state.movieTitle}
              selectRentalCallback={this.selectRental}            
            />)
          } />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default App;