import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Library from './components/Library';
import Customers from './components/Customers';
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
        dueDate: dueDate,
        checkoutDate: checkoutDate,
        alert: `Rental #${response.data["rental"]}! "${movie}" checked out by ${customer}`
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
      dueDate: undefined,
      checkoutDate: undefined,
    })
  }

  addMovieCallback = (movie) => {
    const movieIds = this.state.movies.map(movie => movie.id)
    this.setState({
      movies: [...this.state.movies, {...movie, id: Math.max(...movieIds) + 1}]
    });
  }

  render() {
    const errorSection = (this.state.error) ?
    (<section>Error: {this.state.error}</section>) : null;
    return (
      <Router>
        <div>
          <Header />
          { this.state.rentedMovie && <p>Movie Selection: {this.state.rentedMovie.title}</p> }

          { this.state.chosenCustomer && <p>Customer Selection: {this.state.chosenCustomer.name}</p> }
          
          { this.state.chosenCustomer && this.state.rentedMovie && <button onClick={this.rentMovie}>Rent Movie</button>}

          {this.state.alert} 
          {errorSection}

          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/search" render={() => <Search 
                                                addMovieCallback={this.addMovieCallback}
                                                moviesInLibrary={this.state.movies}/>}/>
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

function Header() {
  return (
    <nav className="nav_container">
      <div>
        <Link className="brand" to="/search">VIDEO WORLD</Link>
      </div>

      <Nav>
        <Link className="nav_link" to="/search">Search</Link>
        <Link className="nav_link" to="/library">Library</Link>
        <Link className="nav_link" to="/customers">Customers</Link>
      </Nav>
    </nav>
  );
}

export default App;
