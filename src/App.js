import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import PropTypes from 'prop-types';
import Library from './components/Library';
import Customers from './components/Customers';
import Rental from './components/Rental';
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
      error: null
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

  formatDate = (time) => {
    let d = new Date(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    year = d.getFullYear();

    if (time === "now") {
      day = d.getDate()
    } else if (time === "future") {
      day = d.getDate() + 5
    }

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return [year, month, day].join('/');
  }
  // Referred to this post for formatting date: https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd


  rentMovie = () => {
    const movie = this.state.rentedMovie
    const customer = this.state.chosenCustomer

    const dueDate = this.formatDate("future")
    const checkoutDate = this.formatDate("now")

    const url = `http://localhost:3001/rentals/${movie.title}/check-out`

    axios.post(url, {
      customer_id: customer.id,
      due_date: dueDate
    })
    .then((response)=> {
      console.log(response)
        // if (response.status === 200) {
          console.log('success')
            this.setState({
                success: `Rented! "${movie.title}" checked out by ${customer.name}`,
                rentedMovie: undefined,
                chosenCustomer: undefined,
            })
            return (
              <Rental movie={movie} customer={customer} checkoutDate={checkoutDate} dueDate={dueDate} />
            )
        // }
    })
    .catch((error) => {
      console.log(error)
      console.log('err')
        this.setState({
            error: error.message
        })
    });
  }

  render() {
    const errorSection = (this.state.error) ?
    (<section>Error: {this.state.error}</section>) : null;

    return (
      <Router>
        <div>
          { this.state.rentedMovie && <p>Movie Selection: {this.state.rentedMovie.title}</p> }

          { this.state.chosenCustomer && <p>Customer Selection: {this.state.chosenCustomer.name}</p> }

          { this.state.rentedMovie && this.state.chosenCustomer && <button onClick={this.rentMovie}>Rent Movie</button>}
          {/* <Rental movie={this.state.rentedMovie} customer={this.state.chosenCustomer} dueDate="" /> } */}

          <Header />

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

          {errorSection}
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
