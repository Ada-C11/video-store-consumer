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
          <header>
            <nav className="nav navbar navbar fixed-top navbar navbar-dark bg-primary">
              <Link to="/" className="navbar-brand">AA Video Rental</Link>
              <Link to="/movies" className="nav-item nav-link">Movies</Link>
              <Link to="/customers" className="nav-item nav-link">Customers</Link>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                <Link to="/search"><button id="search-button" className="btn btn-primary nav-item nav-link" type="submit">Search</button></Link>
              </form>
            </nav>
          </header>
          <main>
            <ul className="checkout">
              <li>
                Selected Movie: {this.getTitle()}
              </li>
              <li>
                Selected Customer: {this.getName()}
              </li>
              <li><a href="#" onClick={this.checkout}>Checkout</a></li>
            </ul>
            
            <Route
              exact={true} path="/" render={() => (
                <div>
                  <h1 className="homepage__title">Welcome to Double A Video Rentals</h1>
                  <p>Select Customers or Movies at the top to start the checkout process!</p>
                </div>
            )}/> 

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


