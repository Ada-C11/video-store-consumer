import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './components/CustomerList';
import RentalLibrary from './components/RentalLibrary';
import Search from './components/Search';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMovie: "",
      selectedCustomer: "",
      movieList: [],
      customerList: [],
    }
  }

  getCustomers = (customers) => {
    this.setState( {customerList: customers})
  }

  onSelectCustomer = (customerId) => {
    const customer = this.state.customerList.find(customer => customer.id === customerId);
    this.setState({selectedCustomer: customer});
  }

  getMovies = (movies) => {

    this.setState( {movieList: movies})
  }

  onSelectMovie = (movieId) => {
    const movie = this.state.movieList.find(movie => movie.id === movieId);
    this.setState({selectedMovie: movie});
  }

  addMovie = (movie) => {
    console.log(this.state.movieList)
    const list = [...this.state.movieList]
    list.push(movie);

    this.setState({movieList: list});
  }

  getTitle = () => {
    const movie = this.state.selectedMovie.title
    return movie
  }

  getName = () => {
    const customer = this.state.selectedCustomer.name
    return customer
  }

  checkout = () => {
    const date = new Date();
    let sevenDays = date.setDate(date.getDate() + 7)
    sevenDays = new Date(sevenDays).toISOString()
    console.log(date)
    const params = {
      customer_id: this.state.selectedCustomer.id, 
      title: this.state.selectedMovie.title,
      due_date: sevenDays
    }
    console.log(params.due_date);

    axios.post(`http://localhost:3000/rentals/${this.state.selectedMovie.title}/check-out`, params)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      });
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
                  <Link to="/search" className="search">Search</Link>
                </li>
                <li>
                  <Link to="/movies" className="movies">Movies</Link>
                </li>
                <li>
                  <Link to="/customers" className="customers">Customers</Link>
                </li>
                <li>
                  This Movie is Currently Selected: {this.getTitle()}
                </li>
                <li>
                  This Customer is Currently Selected: {this.getName()}
                </li>
                <li><a href="#" onClick={this.checkout}>Checkout</a></li>
              </ul>
            </nav>
          </div>
          <main>
            <Route 
              path="/movies"
              render={(props) => <RentalLibrary {...props} selectMovieCallback={this.onSelectMovie} getMovieCallback={this.getMovies}/>}
            />
            <Route 
              path="/customers" 
              render={(props) => <CustomerList {...props} selectCustomerCallback={this.onSelectCustomer} getCustomerCallback={this.getCustomers}/>}
            />
            <Route path="/search" 
            render={(props) => <Search {...props} addMovieCallback={this.addMovie} /> }
            />
          </main>
        </Router>
        
      </div>
    );
  }
}

export default App;


