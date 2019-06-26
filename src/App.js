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
      movieLibrary: [],
      customerList: [],
      selectedMovie: null,
      selectedCustomer: null,
    }
  }

 // Api Call to get movies from json
  componentDidMount() {
    axios.get('/movies')
      .then(response => {
        console.log(response)
        this.setState({
          movieLibrary: response.data
        })
      })
      .catch(error => console.log(error))
      
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

  addMovieToLibrary = (title) => {
    const url = `http://localhost:3000/movies`;
    axios.post(url, title)
    .then(() => {
      alert(`${title} was successfully added to rental library!`);
      // console.log(response)
      // this.setState({
      //   movieLibrary: response.data
      // })
    })
    .catch(error => console.log(error))
  }

  selectMovie = (title) => {
    return () => { 
      this.setState({
        selectedMovie: title
      });
    }
    // const movie = this.state.movieLibrary.find(movie => movie.id === movieId)
    // console.log(this.state.selectedMovie)
  }

  // this method takes in a name rather than an id
  // we'll need the id to send to the checkout request
  selectCustomer = (customerId) => {
    return () => { 
      this.setState({
      selectedCustomer: customerId
      });
    }
    // const customer = this.state.customerLibrary.find(customer => customer.id === customerId)

    // this.setState({
    //   selectedCustomer: customer
    // });
  }

  // pass this as callback method to sidebar
  // do we need to pass in customer id into this method to set params? 
  // maybe we should update the select customer method to store 
  // the entire customer object for reference elsewhere
  checkoutMovie = (title) => {
    axios.post(`/movies/${title}/check-out`, {
      // this won't work until we've updated selectedCustomer
      // to hold all customer data
      params: {
        customer_id: this.state.selectedCustomer.id
      }
    })
    .then(() => {
      alert(`${title} was successfully checked out!`);
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
              <li>Selected Movie: {this.state.selectedMovie}</li>
              <li>
                <Link to="/customers/"> Customer List </Link>
              </li>
              <li>Selected Customer: {this.state.selectedCustomer}</li>
            </ul>
          </nav>

          <Route path="/search/"
            render={(props) => <Search {...props} selectMovie={this.selectMovie} 
            addMovieCallback={this.addMovieToLibrary}/>}
          />
          <Route 
            path="/library/" 
            render={(props) => <Library {...props} selectMovie={this.selectMovie}
            movieLibrary={this.state.movieLibrary} />} 
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
