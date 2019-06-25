import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library.js';
import Search from './components/Search.js';
import Customers from './components/Customers.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected_customer: "none",
      selectCustomerCallBack: this.selectCustomer
    };
  }

  selectCustomer = (customer) => {
    console.log(customer["name"])
    const newSelected = customer
    this.setState({selected_customer: newSelected});
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
        </ul>
      </nav>
{/* <Route path="/" exact component={Index} /> */}
      <Route path="/search/" component={Search} />
      <Route path="/library/" component={Library} />
    <Route path="/customers/" render={(props) => <Customers {...props} selectCustomerCallBack={this.state.selectCustomerCallBack} />} />
      </div>
      </Router>
      </div>
    );
  }
}

export default App;
