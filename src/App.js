import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MovieList from './components/MovieList';
import CustomerList from './components/CustomerList';
import Search from './components/Search';
import Select from './components/Select';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const Index = () => {
//   return (<p></p>);
// }
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      selectedCustomer: null,
      selectedMovie: null,
      customerMessage: null,
    }
  }

  onSelectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer,
    });
  }

  onSelectMovie = (movie) => {
    this.setState({
      selectedMovie: movie,
    });
  }

  onCheckoutMovie = (selectedCustomer, selectedMovie) => {
    if (selectedCustomer !== null && selectedMovie !== null) {
      let dueDate = Date.now() + 604800000  //2 weeks in milliseconds 604800000 
      const checkoutDataToSendToApi = {
        customer_id: selectedCustomer.id,
        due_date: new Date(dueDate)
      };
      axios.post(`http://localhost:3000/rentals/${selectedMovie.title}/check-out`, checkoutDataToSendToApi)
        .then((response) => {
          this.setState({
            customerMessage: `${selectedMovie.title} successfully checked out to ${selectedCustomer.name} (User ID ${selectedCustomer.id})`,
            errorMessage: '',
            selectedCustomer: null,
            selectedMovie: null,
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
          });
        });
    } else {
      this.setState({
        errorMessage: "Please select a user and movie."
      });
    }
  }

  movieLookUp = (movieID) => {
    return this.state.movies.find(movie => movie.external_id === movieID)
  }

  setMovieState = (allMovies) => {
    this.setState({
      movies: allMovies,
    });
  }

  render() {
    const errorSection = (this.state.errorMessage) ?
      (<section className="alert alert-danger">
        Error: {this.state.errorMessage}
      </section>) : null;

    const messageSection = (this.state.customerMessage) ?
      (<section className="alert alert-info">
        {this.state.customerMessage}
      </section>) : null;

    return (
      <main>
        <header>
          <h1>Yes, We're Still Around Video Store</h1>
          {errorSection}
          {messageSection}
        </header>

        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li className="nav-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="nav-link">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="nav-link">
                  <Link to="/customers">Customers</Link>
                </li>
                <li className="nav-link">
                  <Link to="/search">Search</Link>
                </li>
              </ul>
            </nav>

            <div>
              {(this.state.selectedMovie || this.state.selectedCustomer) && <Select
                movie={this.state.selectedMovie}
                customer={this.state.selectedCustomer}
                onCheckoutMovie={this.onCheckoutMovie}
              />}
            </div>
            {/* <Route path="/" exact component={Index} />
            <Route path="/home" exact component={Index} /> */}
            <Route
              path="/movies"
              render={(props) => <MovieList {...props} setMovieState={this.setMovieState} movies={this.state.movies} onSelectMovieCallback={this.onSelectMovie} isAuthed={true} />}
            />
            <Route
              path="/customers"
              render={(props) => <CustomerList {...props} onSelectCustomer={this.onSelectCustomer} isAuthed={true} />}
            />
            <Route path="/search/"
              render={(props) => <Search {...props} setMovieState={this.setMovieState} movieLookUp={this.movieLookUp} />}
            />
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
