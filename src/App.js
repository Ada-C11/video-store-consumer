import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/Search';
import Library from './components/Library';
import Customers from './components/Customers';
import Log from './components/Log';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers: [],
      allRentals: undefined,
      customerRentals: undefined,
      overdueMovies: undefined,
      expandedMovies: {},
      rentedMovie: undefined,
      chosenCustomer: undefined,
      dueDate: undefined,
      checkoutDate: undefined,
      currentRental: {
        count: undefined,
        movie: undefined,
        customer: undefined,
        checkin: false,
      },
      error: null,
    };
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

  addMovieCallback = (movie) => {
    const movieIds = this.state.movies.map(movie => movie.id)
    this.setState({
      movies: [...this.state.movies, {...movie, id: Math.max(...movieIds) + 1}]
    });
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
      this.setState((prevState) => ({
        dueDate: dueDate,
        checkoutDate: checkoutDate,
        currentRental: {
          ...prevState.currentRental,
          count: response.data["rental"],
          movie: prevState.rentedMovie.title,
          customer: prevState.chosenCustomer.id,
        }
      }))

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

  checkinMovie = () => {
    const url = `http://localhost:3001/rentals/${this.state.currentRental.movie}/return`;

    const params = {
      customer_id: this.state.currentRental.customer,
    }

    axios.post(url, params)
    .then(() => {
      this.setState((prevState) => ({
        currentRental: {
          ...prevState.currentRental,
          count: undefined,
          movie: undefined,
          customer: undefined,
          checkin: true,
        }
      }))
    })
      .catch((error) => {
        this.setState({
            error: error.message
        })
      })
    }

  setOverdueMoviesCallback = (value) => {
    this.setState({ 
      overdueMovies: value
    })
  }

  setErrorOverdueCallback = (error) => {
    this.setState({ 
      error: error.message
    });
  }


  gatherAllRentals = (customerID) => {
    let uniqueRentals = {}

    axios.get('http://localhost:3001/rentals')
    .then((response) => {
      response.data.forEach((rental, i) => {
        if (rental !== null) {
          uniqueRentals[i] = {
            "customer": rental.customer_id,
            "movie": rental.title,
            "checkout_date": rental.checkout_date,
            "due_date": rental.due_date
          }
        }
      })

      this.setState({ 
        allRentals: uniqueRentals
      })

      this.findCustomerRentals(customerID)
    })
    .catch((error) => {
      this.setState({ 
        error: error.message
      });
    });
  }

  findCustomerRentals = (customerID) => {
    const rentals = []

    for (let key in this.state.allRentals) {
      if (this.state.allRentals[key]["customer"] === customerID) {
        rentals.push(
          {
            "movie": this.state.allRentals[key]["movie"],
            "checkout_date": this.state.allRentals[key]["checkout_date"],
            "due_date": this.state.allRentals[key]["due_date"]
          }
        )
      }
    }

    this.setState({
      customerRentals: rentals,
    });
  }

  onCustomerRentalsCallback = (customerID) => {
    this.gatherAllRentals(customerID)
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

          {this.state.currentRental.count && <div>Rental #{this.state.currentRental.count}: "{this.state.currentRental.movie}" checked out by Customer #{this.state.currentRental.customer}</div>} 
          {this.state.currentRental.count && <button onClick={this.checkinMovie}>Check-in Movie</button>}

          {!this.state.chosenCustomer && !this.state.rentedMovie && 
            this.state.currentRental.checkin && <p>Movie Successfully Checked-In!</p>}
          
          {errorSection}

          <Route 
            path="/search" 
            render={() => (
              <Search
                addMovieCallback={this.addMovieCallback}
                moviesInLibrary={this.state.movies}
              />
            )}
          />
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
                // allRentals={this.state.allRentals}
                customerRentals={this.state.customerRentals}
                customers={this.state.customers} 
                onSelectCustomerCallback={this.onSelectCustomerCallback}
                onCustomerRentalsCallback={this.onCustomerRentalsCallback}
              />
            )} 
          />
          <Route 
            path="/log" 
            render={() => (
              <Log  
                overdueMovies={this.state.overdueMovies}
                allRentals={this.state.allRentals}
                setAllRentals={this.setAllRentals}
                setAllRentalsError={this.setAllRentalsError}
                setOverdueMoviesCallback={this.setOverdueMoviesCallback}
                setErrorOverdueCallback={this.setErrorOverdueCallback}
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
        <Link className="nav_link" to="/log">Log</Link>
      </Nav>
    </nav>
  );
}

export default App;
