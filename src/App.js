import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import './App.css';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import Notfound from './notfound'

class App extends Component {
  constructor() {
    super();
      this.state = {
        selectedCustomer: null,
        selectedMovie: null,
      }
  }
  
  selectCustomer = (customerID) => {
    console.log('select Customer in App')
    
  }
    // selectMovieForRental = (movieTitle) => {
    //   this.setState({
    //     selectedMovie: movieTitle
    //   })
    // }
  
    // selectCustomerForRental = (customerObject) => {
    //   this.setState({
    //     selectedCustomer: customerObject
    //   })
    // }
  
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
              <Link to="customers">Customer Registry</Link>
            </li>
          </ul>
        <Switch>
          <Route exact path="/" render={() => (<h1>Rewind Movies</h1>)}/> />
          <Route path="/movies" component={Library} />
          <Route path="/customers" render={ (props) => (<CustomerList {...props} selectCustCallback={this.selectCustomer}/>)} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>);
  }
}


export default App;
