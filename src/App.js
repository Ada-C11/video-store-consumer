import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
// import PropTypes from 'prop-types';
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

  rentMovie = () => {
    const movie = this.state.rentedMovie
    const customer = this.state.chosenCustomer

    const checkoutDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7 );

    const checkoutDateFormatted = `${checkoutDate.getFullYear()}/${checkoutDate.getMonth() + 1}/${checkoutDate.getDate()}`;
    const dueDateFormatted = `${dueDate.getFullYear()}/${dueDate.getMonth() + 1}/${dueDate.getDate()}`;

    console.log(checkoutDate);
    console.log(checkoutDateFormatted);
    console.log(dueDate);
    console.log(dueDateFormatted);


    const url = `http://localhost:3001/rentals/${movie.title}/check-out`;

    const params = {
      due_date: dueDate,
      customer_id: customer.id,
    }

    axios.post(url, params)
    .then((response)=> {
      console.log(response)
      console.log(`Rented! "${movie.title}" checked out by ${customer.name}`)

          this.setState({
              rentedMovie: undefined,
              chosenCustomer: undefined,
          })
        return (
          <Rental movie={movie} customer={customer} checkoutDate={checkoutDateFormatted} dueDate={dueDateFormatted} />
        )
    })
    .catch((error) => {
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
