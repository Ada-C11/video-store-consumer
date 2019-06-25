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
    axios.post(`/movies/${title}`)
    .then(response => {
      console.log(response)
      this.setState({
        customerList: response.data
      })
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
            render={(props) => <Search {...props} selectMovie={this.selectMovie} addMovieCallback={this.addMovieToLibrary}/>}
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
