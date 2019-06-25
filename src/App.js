import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import MovieCard from './components/MovieCard';
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

  //Api call to search movies
  // searchMovies = (query) => {
  //   axios.get(`/movies?query=${query}`)
  //     .then(response => {
  //       console.log(response)
  //       this.setState({
  //         customerList: response.data
  //       })
  //     })
  //     .catch(error => console.log(error))
  // }

  addMovieToLibrary = () => {

  }

  selectMovie = (movieId) => {
    const movie = this.state.movieLibrary.find(movie => movie.id === movieId)

    this.setState({
      selectedMovie: movie
    });
  }

  selectCustomer = (customerId) => {
    const customer = this.state.customerLibrary.find(customer => customer.id === customerId)

    this.setState({
      selectedCustomer: customer
    });
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
            </ul>
          </nav>

          <Route path="/search/" component={Search} />
          <Route path="/library/" component={Library} />
          <Route 
            path="/customers/" 
            render={(props) => <CustomerList {...props} customerList={this.state.customerList} />}
          />


        </div>
      </Router>
    );
  }
}

export default App;
