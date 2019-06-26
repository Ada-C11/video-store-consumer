import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import './App.css';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import Notfound from './notfound'
import image from './images/image.jpeg'
import Rentals from './components/Rentals'

class App extends Component {
  constructor() {
    super();
      this.state = {
        selectedCustomer: null,
      }
  }
  
  selectCustomer = (customerID) => {
    console.log('select Customer in App')
    this.setState({selectedCustomer: customerID})
  }

  
  showHome() {
    return (
      <div className="container">
        <h1>Rewind Movies</h1>
          <img src={image} alt="theater"/>
      </div>
    )
  }
    selectMovieForRental = (movieTitle) => {
      this.setState({
        selectedMovie: movieTitle
      })
    }
  
  render() {
    return (
      <Router>
        <div>
          <ul>
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
          <Route exact path="/" render={() => (this.showHome())}/> />
          <Route path="/movies" component={Library} />
          <Route path="/customers" render={ (props) => (<CustomerList {...props} selectCustCallback={this.selectCustomer}/>)} />
          <Route path="/rental" render={ (props) => (
            <Rentals {...props} 
              customerID={this.state.selectedCustomer}              
            />)
          } />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default App;