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
      message: "",
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
      this.setState({
        message: `Successfully checked out ${this.state.selectedMovie.title}.`
      })
    })
    .catch((error) => {
      this.setState({
        message: `${this.state.selectedMovie.title} was not checked out.`
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
              <Link to="/search"><button id="search-button" className="btn btn-primary nav-item nav-link" type="submit">Search for New Movies</button></Link>
            </nav>
          </header>
          <main>
            <div className="error">{this.state.message}</div>
            <section>
              <h4>
                Currently Selected:
              </h4>
              <ul className="checkout">
                <li>
                  <strong>Movie:</strong> {this.getTitle()}
                </li>
                <li>
                  <strong>Customer:</strong> {this.getName()}
                </li>
                <button className="btn btn-primary" onClick={this.checkout}>Checkout</button>
              </ul>
            </section>
            <Route
              exact={true} path="/" render={() => (
                <div className="homepage">
                  <h1 className="homepage__title">Welcome to AA Video Rentals</h1>
                  <p className="homepage-p">Select Customers or Movies at the top to start the rental process!</p>
                  <p className="homepage-p">If you don't find the video you are looking for, add a new one by using search.</p>
                  <img src="https://boygeniusreport.files.wordpress.com/2016/03/movies-tiles.jpg?quality=98&strip=all" alt="movies" width="900px" height="600px"/>
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


