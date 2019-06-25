import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library.js';
import Search from './components/Search.js';
import Customers from './components/Customers.js';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      selected_customer: "none",
      selectCustomerCallBack: this.selectCustomer,
      selected_movie: "none",
    };
  }

  componentDidMount() {
    this.updateCustomers()
  }

  updateCustomers = () => {
    const url = `http://localhost:3000/customers`
    axios.get(url)
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  selectCustomer = (customer) => {
    const newSelected = customer
    this.setState({selected_customer: newSelected});
  }

  onCheckOut = () => {
    const url =  `http://localhost:3000/rentals/:title/check-out`
    axios.post(url)
    .then((response) => {
      this.updateCards()
    })
    .catch((error) => {
      // Use the same idea we had in our GET request
      this.setState({ error: error.message });
    });
  }


  render() {
    return (
      <div>
      <Router>
        <div>
          <nav>
            <ul>
               <li>
               <Link to="/">Home</Link>
              </li>
               <li>
              <Link to="/search/">Search Movies</Link>
            </li>
           <li>
            <Link to="/library/">Library</Link>
          </li>
          <li>
            <Link to="/customers/">Customers</Link>
          </li>
          <li>
            Selected Customer: {this.state.selected_customer["name"]}
          </li>
          <li>
            Selected Movie: {this.state.selected_movie["name"]}
          </li>
          <li>
            <button className="" onClick={this.onCheckOut}>
            Check Out</button>
          </li>
        </ul>
      </nav>
{/* <Route path="/" exact component={Index} /> */}
      <Route path="/search/" component={Search} />
      <Route path="/library/" component={Library} />
      <Route path="/customers/" render={(props) => <Customers {...props} customers={this.state.customers} selectCustomerCallBack={this.state.selectCustomerCallBack} />} />
      </div>
      </Router>
      </div>
    );
  }
}

export default App;
