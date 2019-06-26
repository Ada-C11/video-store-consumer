import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './components/CustomerList';
import RentalLibrary from './components/RentalLibrary';
import Search from './components/Search';



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
    console.log(movies)
    this.setState( {movieList: movies})
  }

  onSelectMovie = (movieId) => {
    const movie = this.state.movieList.find(movie => movie.id === movieId);
    this.setState({selectedMovie: movie});
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
            <Route path="/search" component={Search} />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;


