import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import axios from 'axios'

import Search from './components/Search'
import Home from './components/Home'
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
    console.log('https://localhost:3090/rentals/' + this.state.movieTitle + '/check-out')
    console.log(this.state.movieTitle)
    console.log(this.state.customer.id)
    console.log(new Date() + 7)
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
      console.log(response)
      this.setState(
        {
          movieTitle: "", 
          customer: "",
          checkoutButtonClassName: "checkout-button",
      })
    })

    
    .catch((error)=>{
      console.log(error.message)
      this.setState({error: error.message, errorClass: 'display-error'});
      console.log(this.state.error)
      console.log(this.state.errorClass)

    })
    // this.setState({error: "", errorClass: 'no-error'});
  }


  addMovieToRent = (title) => {
    let movieTitle = this.state.movieTitle;
    movieTitle = title;
    this.setState({movieTitle})
    console.log("in callback ", title)
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
          <h2>{this.state.movieTitle}</h2>
          <h2>{this.state.customer.name}</h2>
          <button className={this.state.checkoutButtonClassName}
            onClick={this.onCheckoutClick}>
          Checkout!</button>
          <Header movieTitle={this.state.movieTitle} customerName={this.state.customer.name} onCheckoutClickCallback={this.onCheckoutClick} checkoutButtonClassName={this.state.checkoutButtonClassName}/>
          <Route exact path="/" component={Home} />
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
