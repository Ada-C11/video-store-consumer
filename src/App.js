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
      selectedMovie: null,
      selectedCustomer: null,
    }
  }

 // Api Call to get movies from json
  componentDidMount() {
      // Api call to get all customers
      axios.get('/customers')
      .then(response => {
        console.log(response)
        this.setState({
          customerList: response.data
        })
      })
      .catch(error => console.log(error))
  }

  // Api call to get single movie
  showMovieDetails = (title) => {
    axios.get(`/movies/${title}`)
      .then(response => {
        console.log(response)
        this.setState({
          customerList: response.data
        })
      })
      .catch(error => console.log(error))
  }

  addMovieToLibrary = (movie) => {
    const url = `http://localhost:3000/movies`;
    axios.post(url, movie)
    .then(() => {
      // let movieLibraryUpdate = this.state.movieLibrary;
      // this.setState({ movieLibrary: movieLibraryUpdate})
      alert(`${movie.title} was successfully added to rental library!`);
      // console.log(response)
      // this.setState({
      //   movieLibrary: response.data
      // })
    })
    .catch(error => console.log(error))
  }

  selectMovie = (movie) => {
    console.log(movie)
    // return () => { 
      this.setState({
        selectedMovie: movie
      });
    // }
    // const movie = this.state.movieLibrary.find(movie => movie.id === movieId)
    // console.log(this.state.selectedMovie)
  }

  // this method takes in a name rather than an id
  // we'll need the id to send to the checkout request
  selectCustomer = (customer) => {
    console.log(customer)
    // return () => { 
      this.setState({
        selectedCustomer: customer
      });
    // }
    // const customer = this.state.customerLibrary.find(customer => customer.id === customerId)

    // this.setState({
    //   selectedCustomer: customer
    // });
  }

  checkoutMovie = (movie, customer) => {
    let dueDate = Date.now() + 604800000
    const checkoutParams = {
      customer_id: customer.id,
      due_date: new Date(dueDate) 
    };
    axios.post(`/rentals/${movie.title}/check-out`, checkoutParams)
    .then(() => {
      alert(`${movie.title} was successfully checked out to ${customer.name}!`);
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header>
              <h1>Video Store Consumer</h1>
          </header>
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
              <button type="button" onClick={() => {this.checkoutMovie(this.state.selectedMovie, this.state.selectedCustomer)}}>Checkout Movie</button>
            </ul>
          </nav>

          <Route path="/search/"
            render={(props) => <Search {...props} selectMovie={this.selectMovie} 
            addMovieCallback={this.addMovieToLibrary}/>}
          />
          <Route 
            path="/library/" 
            render={(props) => <Library {...props} selectMovie={this.selectMovie}
            />} 
          />
          <Route 
            path="/customers/" 
            render={(props) => <CustomerList {...props} selectCustomer={this.selectCustomer}
            customerList={this.state.customerList} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
