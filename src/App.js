import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
      dueDate: undefined,
      checkoutDate: undefined,
      currentRental: {
        count: undefined,
        movie: undefined,
        customer: undefined,
      },
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

  // checkinMovie = () => {
      // currentRental: undefined,
  // }

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

          {errorSection}

          <Route exact path="/" component={Home} />
          <Route path="/search" render={() => <Search moviesInLibrary={this.state.movies}/>}/>
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
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand>Video World</Navbar.Brand>
    <Nav className="mr-auto">
      <Link className="nav_link" to="/">Home</Link>
      <Link className="nav_link" to="/search">Search</Link>
      <Link className="nav_link" to="/library">Library</Link>
      <Link className="nav_link" to="/customers">Customers</Link>
    </Nav>
    </Navbar>
  );
}

export default App;
