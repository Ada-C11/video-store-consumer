import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import axios from 'axios'

import Search from './components/Search'
import Header from './components/Header'
import Customers from './components/Customers'
import Library from './components/Library'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      customer: "",
      checkoutButtonClassName: "checkout-button",
      error: "",
      errorClass: "no-error",
    }

  }

  onCheckoutClick = () => {
    let today = new Date()
    let newdate = new Date();
    newdate.setDate(today.getDate()+7);
    axios.post('http://localhost:3090/rentals/' + this.state.movieTitle + '/check-out', 
    
      {
        title: this.state.movieTitle,
        customer_id: this.state.customer.id,
        due_date: newdate
      }
    )

    .then((response) => {
      this.setState(
        {
          movieTitle: "", 
          customer: "",
          checkoutButtonClassName: "checkout-button",
      })
    })

    
    .catch((error)=>{
      this.setState({error: error.message, errorClass: 'display-error'});

    })
  }


  addMovieToRent = (title) => {
    let movieTitle = this.state.movieTitle;
    movieTitle = title;
    this.setState({movieTitle})
    if (this.state.customer.name) {
      let checkoutButtonClassName = this.state.checkoutButtonClassName;
      checkoutButtonClassName = "checkout-button-display"
      this.setState({checkoutButtonClassName})
    }
  }

  addCustomerToRent = (customer) => {
    let newCustomer = this.state.customer;
    newCustomer = customer;
    this.setState({customer: newCustomer})
    if (this.state.movieTitle.length>0) {
      let checkoutButtonClassName = this.state.checkoutButtonClassName;
      checkoutButtonClassName = "display"
      this.setState({checkoutButtonClassName})
    }
  }

  onClickAnywhere = () => {
    this.setState({error: "", errorClass: 'no-error'});
  }

  render () {    
    return (
      <Router>
        <div onClick = {this.onClickAnywhere}>
          <p className={this.state.errorClass} >{this.state.error}</p>
          <Header movieTitle={this.state.movieTitle} customerName={this.state.customer.name} onCheckoutClickCallback={this.onCheckoutClick} checkoutButtonClassName={this.state.checkoutButtonClassName}/>
          <Route path="/search" component={Search} />
          <Route path="/library" render={(routeProps) => (<Library {...routeProps} addMovieToRentCallback={this.addMovieToRent}/>)}
          />
          <Route path="/customers" render={(routeProps) => (<Customers {...routeProps} addCustomerToRentCallback={this.addCustomerToRent}/>)} 
          />
        </div>
      </Router>
    );
  }
}

export default App;
