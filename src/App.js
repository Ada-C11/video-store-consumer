import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library.js';
import Search from './components/Search.js';
import Customers from './components/Customers.js';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      library: [],
      selected_customer: "none",
      selectCustomerCallBack: this.selectCustomer,
      selectMovieCallBack: this.selectMovie,
      selected_movie: "none",
      notification: null
    };
  }

  componentDidMount() {
    this.updateCustomers()
    this.getLibrary()
  }

  getLibrary = () => {
    const url = `http://localhost:3000/movies`
    axios.get(url)
      .then((response) => {
        this.setState({ library: response.data });
        console.log(response)
      }) 
      .catch((error) => {
        this.setState({ error: error.message });
      });
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

  selectMovie = (movie) => {
    this.setState({selected_movie: movie})
  }

  onCheckOut = () => {
    if (this.state.selected_customer !== "none" && this.state.selected_movie !== "none") {

    const currentDate = new Date()
    currentDate.setMonth(currentDate.getMonth() + 1)
    const dueDate = currentDate

    const config = {
      movie_id: this.state.selected_movie["id"],
      customer_id: this.state.selected_customer["id"],
      due_date: dueDate
    }
    const url =  `http://localhost:3000/rentals/${this.state.selected_movie["title"]}/check-out`
    axios.post(url, config)
    .then((response) => {
       if(response.status === 200) {
        this.setState({notification: `Succesfully checked out!`})
      }
    })
    .catch((error) => {
      // Use the same idea we had in our GET request
      this.setState({ error: error.message });
    });
  }

  }


  render() {
    const notification = this.state.notification
    return (
      <div>
      <Router>
        <div>
          <nav>
            <ul className="navbar">
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
            Selected Movie: {this.state.selected_movie.title}
          </li>
          <li>
            <button className="" onClick={this.onCheckOut}>
            Check Out</button>
          </li>
          <li>
            {notification}
          </li>
        </ul>
      </nav>
{/* <Route path="/" exact component={Index} /> */}
      <Route path="/search/" component={Search} />
      <Route path="/library/" render={
        (props) => <Library {...props}
                      library={this.state.library}
                      selectMovieCallBack={this.state.selectMovieCallBack} 
                    />
      } />
      <Route path="/customers/" render={(props) => <Customers {...props} customers={this.state.customers} selectCustomerCallBack={this.state.selectCustomerCallBack} />} />
      </div>
      </Router>
      </div>
    );
  }
}

export default App;
