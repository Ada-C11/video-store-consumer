import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import './App.css';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import Notfound from './notfound'
import image from './images/image.jpeg'


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

  showHome() {
    return (
      <div className="container">
        <h1>Rewind Movies</h1>
          <img src={image} alt="theater"/>
      </div>
    )
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
      </div>
        <Switch>
          <Route exact path="/" render={() => (this.showHome())}/> />
          <Route path="/movies" component={Library} />
          <Route path="/customers" render={ (props) => (<CustomerList {...props} selectCustCallback={this.selectCustomer}/>)} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default App;

const movieRental = (props) => {
  const {customerID, movieID} = props
  return (
    <div></div>
  )
}