import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Library from './components/Library';
import Home from './components/Home';
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
      let success = `${movie.title} was successfully added to rental library!`;
      let updatedLibrary = this.state.movieLibrary.slice();
      updatedLibrary.push(movie);
      this.setState(
        {
          userMessages: [success],
          movieLibrary: updatedLibrary,
        })
    })
    .catch(error => console.log(error))
  }

  selectMovie = (movie) => {
      const movieRecord = this.state.movieLibrary.filter(libraryMovie => libraryMovie.title === movie.title);
      this.setState({
        selectedMovie: movieRecord[0]
      });
  }

  selectCustomer = (customer) => {
      this.setState({
        selectedCustomer: customer
      });
  }

  filterMovies = (title) => {
    const movieExists = this.state.movieLibrary.filter(movie => movie.title === title);
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
      let success = `${movie.title} was successfully checked out to ${customer.name}!`;
      this.setState({
        userMessages: [success],
        selectedCustomer: null,
        selectedMovie: null,
      })
    })
    .catch(error => console.log(error));
  }

  render() {
    const allUserMessages = this.state.userMessages.map((message, i) => {
      return <p class="alert alert-success" role="alert" key= {i}>{ message }</p>;
    })

    const enabledCheckout = this.state.selectedCustomer && this.state.selectedMovie !== null

    const displaySelectedItems = (this.state.selectedCustomer || this.state.selectedMovie !== null) ?
          <section className="selected-items">
            <span><b>Selected Movie:</b> {this.state.selectedMovie ? this.state.selectedMovie.title : <i>Please make a selection.</i>}</span>
            <span><b>Selected Customer:</b> {this.state.selectedCustomer ? this.state.selectedCustomer.name : <i>Please make a selection.</i>}</span>
            <button disabled={!enabledCheckout} type="button" className="btn btn-info"onClick={() => {this.checkoutMovie(this.state.selectedMovie, this.state.selectedCustomer)}}>Checkout Movie</button>
          </section> : ''

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg bg-info">
            <div className="left-nav">
              <span className="navbar-brand"><Link to="/"> crow//video </Link></span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
              <div className="collapse navbar-collapse right-nav" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/library/"> Movies </Link>
                  </li>
                  <li className="nav-item">                
                    <Link to="/customers/"> Customers </Link>
                  </li>
                  <li className="nav-item">               
                    <Link to="/search/"> Search Movies </Link>
                  </li>
                </ul>
              </div>
          </nav>

          <section className="user-messages">
            {allUserMessages}
          </section>

          <section className="store">
            <div className="selected-info">
            {displaySelectedItems}
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/search/"
              render={(props) => <Search {...props} 
              selectMovie={this.selectMovie} 
              addMovieCallback={this.addMovieToLibrary}
              filterMoviesCallback={this.filterMovies}
              />}
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
          </section>
        </div>
      </Router>
    );
  }
}

export default App;