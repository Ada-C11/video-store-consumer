import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      userMessages: [],
      customerList: [],
      movieLibrary: [],
      selectedMovie: null,
      selectedCustomer: null,
    }
  }

  componentDidMount() {
      axios.get('/customers')
      .then(response => {
        this.setState({
          customerList: response.data
        })
      })
      .catch(error => console.log(error))

      axios.get('/movies')
      .then(response => {
        console.log(response)
        this.setState({
          movieLibrary: response.data
        })
      })
      .catch(error => console.log(error))
  }

  addMovieToLibrary = (movie) => {
    const url = `http://localhost:3000/movies`;
    axios.post(url, movie)
    .then((response) => {
      console.log(response)
      let success = `${movie.title} was successfully added to rental library!`;
      this.setState({userMessages: [success]})
      // setstate with new movie
    })
    .catch(error => console.log(error))
  }

  selectMovie = (movie) => {
      this.setState({
        selectedMovie: movie
      });
  }

  selectCustomer = (customer) => {
      this.setState({
        selectedCustomer: customer
      });
  }

  filterMovies = (title) => {
    const library = this.state.movieLibrary
    const movieExists = library.filter(movie => movie.title === title);
    if (movieExists.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkoutMovie = (movie, customer) => {
    let dueDate = Date.now() + 604800000
    const checkoutParams = {
      customer_id: customer.id,
      due_date: new Date(dueDate) 
    };
    axios.post(`/rentals/${movie.title}/check-out`, checkoutParams)
    .then(() => {
      let success = `${movie.title} was successfully added to rental library!`;
      this.setState({userMessages: [success]})
    })
    .catch(error => console.log(error));
  }

  render() {
    const allUserMessages = this.state.userMessages.map((message, i) => {
      return <p key= {i}>{ message }</p>;
    })

    const enabledCheckout = this.state.selectedCustomer && this.state.selectedMovie !== null
    return (
      <Router>
        <div className="App">
          <header>
              <h1>Video Store Consumer</h1>
          </header>

          <section className="user-messages">
            {allUserMessages}
          </section>

          <nav>
            <ul className="nav-list">
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/search/"> Search </Link>
              </li>
              <li>
                <Link to="/library/"> Movie Library </Link>
              </li>
              <li>
                <Link to="/customers/"> Customer List </Link>
              </li>
              <li>Selected Movie: {this.state.selectedMovie ? this.state.selectedMovie.title : "No movie selected"}</li>
              <li>Selected Customer: {this.state.selectedCustomer ? this.state.selectedCustomer.name : "No customer selected"}</li>
              <button disabled={!enabledCheckout} type="button" onClick={() => {this.checkoutMovie(this.state.selectedMovie, this.state.selectedCustomer)}}>Checkout Movie</button>
            </ul>
          </nav>

          <Route path="/search/"
            render={(props) => <Search {...props} 
            selectMovie={this.selectMovie} 
            addMovieCallback={this.addMovieToLibrary}
            filterMoviesCallback={this.filterMovies}/>}
          />
          <Route 
            path="/library/" 
            render={(props) => <Library {...props} 
            selectMovie={this.selectMovie}
            filterMoviesCallback={this.filterMovies}
            movieLibrary={this.state.movieLibrary}
            />} 
          />
          <Route 
            path="/customers/" 
            render={(props) => <CustomerList {...props} 
            selectCustomer={this.selectCustomer}
            customerList={this.state.customerList} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
