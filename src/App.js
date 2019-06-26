import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
// import PropTypes from 'prop-types';
import Library from './components/Library';
import Customers from './components/Customers';
// import Rental from './components/Rental';
import axios from 'axios';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers: [],
      expandedMovies: {},
      rentedMovie: undefined,
      chosenCustomer: undefined,
      // rentalExists: false,
      dueDate: undefined,
      checkoutDate: undefined,
      alert: undefined,
      error: null,
    };
  }

  onClickDetailsCallback = (id) => {
    this.setState((prevState) => ({ 
      expandedMovies: {
        ...prevState.expandedMovies, 
        [id]: !prevState.expandedMovies[id],
      }
    }));
  }

  onSelectMovieCallback = (index) => {
    const selectedMovie = this.state.movies[index]
    this.setState({ rentedMovie: selectedMovie });
  }

  onSelectCustomerCallback = (index) => {
    const selectedCustomer = this.state.customers[index]
    this.setState({ chosenCustomer: selectedCustomer });
  }

  componentDidMount() {
    axios.get('http://localhost:3001/movies')
    .then((response) => {
      this.setState({ movies: response.data});
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });

    axios.get('http://localhost:3001/customers')
    .then((response) => {
      this.setState({ customers: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });

  }

  rentMovie = () => {
    const checkoutDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7 );
  
    const url = `http://localhost:3001/rentals/${this.state.rentedMovie.title}/check-out`;

    const params = {
      due_date: dueDate,
      customer_id: this.state.chosenCustomer.id,
    }

    axios.post(url, params)
    .then((response)=> {
      const movie = this.state.rentedMovie.title
      const customer = this.state.chosenCustomer.name

      this.setState({
        // rentalExists: true,
        dueDate: dueDate,
        checkoutDate: checkoutDate,
        alert: `Rented! "${movie}" checked out by ${customer}`
      })

      this.onRentCallback()
    })
    .catch((error) => {
        this.setState({
            error: error.message
        })
    })
  }

  onRentCallback = () => {
    this.setState({
      rentedMovie: undefined,
      chosenCustomer: undefined,
      // rentalExists: false,
      dueDate: undefined,
      checkoutDate: undefined,
    })
  }

  render() {
    const errorSection = (this.state.error) ?
    (<section>Error: {this.state.error}</section>) : null;

    return (
      <Router>
        <div>
          { this.state.rentedMovie && <p>Movie Selection: {this.state.rentedMovie.title}</p> }

          { this.state.chosenCustomer && <p>Customer Selection: {this.state.chosenCustomer.name}</p> }

          { this.state.chosenCustomer && this.state.rentedMovie && <button onClick={this.rentMovie}>Rent Movie</button>}

          <Header />
          {this.state.alert} 
          {errorSection}

          <Route exact path="/" component={Home} />
          <Route path="/search" render={() => <Search />}/>
          <Route 
            path="/library" 
            render={() => (
              <Library 
                library={this.state.movies} 
                expandedMovies={this.state.expandedMovies} 
                onClickDetailsCallback={this.onClickDetailsCallback} 
                onSelectMovieCallback={this.onSelectMovieCallback} 
              />
            )} 
          />
          <Route 
            path="/customers" 
            render={() => (
              <Customers 
                customers={this.state.customers} 
                onSelectCustomerCallback={this.onSelectCustomerCallback}
              />
            )} 
          />
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/library">Library</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
    </ul>
  );
}

export default App;
