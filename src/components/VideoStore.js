import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './VideoStore.css'

import Customers from './Customers';
import Movies from './Movies';
import SearchBar from './SearchBar';
import SearchMatches from './SearchMatches';
import StatusBar from './StatusBar';

class VideoStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Customers
      customerList: [],
      currentCustomer: "",
      // Movies
      movieList: [],  
      currentMovie: "",
      // SearchBar
      queryString: "",
      searchMatches: [],
      // StatusBar
      feedbackMessage: ""
    };
  }
  url = "http://localhost:5000/"

  componentDidMount() {
    this.getCustomers();
    this.getMovies();
  }

  getCustomers = () => {
    const customersURL = `${this.url}customers`
    axios.get(customersURL)
    .then(response => {
      console.log(response)

      const customerList = response.data.map((customer) => {
        const newCustomer = {
          id: customer.id,
          name: customer.name,
        }
        return newCustomer;
      })

      console.log(customerList);

      const feedbackMessage = `Successfully loaded ${customerList.length} customers!`

      this.setState({ customerList, feedbackMessage });
     })
      .catch((error) => {
        const feedbackMessage = `Error loading customers`
        this.setState({ 
          error: error.message,
          feedbackMessage
        })
      })
  }

  getMovies = () => {
    axios.get(this.url)
    .then((response) => {
      console.log(response.data);

      const movieList = response.data.map((movie) => {
        const newMovie = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id,
        }
        return newMovie;
      })

      console.log(movieList);

      const feedbackMessage = `Successfully loaded ${movieList.length} movies!`

      this.setState({ movieList, feedbackMessage });
    })
    .catch((error) => {
      const feedbackMessage = `Error loading movies`
      this.setState({ 
        error: error.message,
        feedbackMessage
      })
    })
  }

  getFeedbackMessage = () => {
    const feedbackMessage = `Hey`
    this.setState({ feedbackMessage });
  }

  onCustomerSelect = (customerID) => {
    const currentCustomer = this.state.customerList.filter(customer => customer.id === customerID)[0]

    console.log(currentCustomer)
    this.setState({ currentCustomer });
  };

  onMovieSelect = (movieID) => {
    const currentMovie = this.state.movieList.filter(movie => movie.id === movieID)[0]

    console.log(currentMovie)
    this.setState({ currentMovie });
  };

  searchCallback = (queryString) => {
    const searchURL = `${this.url}movies?query=${queryString}`
    axios.get(searchURL)
    .then((response) => {
      console.log(response.data)

      const searchMatches = response.data.map((movie) => {
        const newMovie = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id,
        }
        return newMovie;
      })

      console.log(searchMatches);

      this.setState({ searchMatches });
    })
    .catch((error) => {
      const feedbackMessage = `Error loading search items`
      this.setState({ 
        error: error.message,
        feedbackMessage
      })
    })
    
    this.setState({ queryString });
  }

  onMovieAdd = (movieID) => {
    const movieToAdd = this.state.searchMatches.find(movie => movie.id === movieID);
    const titleOfMovieToAdd = movieToAdd.title
    const addMovieURL = `${this.url}movies/${titleOfMovieToAdd}`;

    console.log(`Sending POST to ${addMovieURL} with payload`, titleOfMovieToAdd);

    axios.post(addMovieURL, titleOfMovieToAdd)
    .then((response) => {
      console.log(response.data)
      const newMovie = response.data;
      console.log(newMovie)

      const newMovieList = [newMovie, ...this.state.movieList];
      const feedbackMessage = `Successfully added ${newMovie.title} to library!`

      this.setState({ 
        movieList: newMovieList,
        queryString: "",
        feedbackMessage
       });
    })
    .catch((error) => {
      const feedbackMessage = `Error adding ${titleOfMovieToAdd}`
      this.setState({ 
        error: error.message,
        feedbackMessage
      })
    })
  };

  onRentalCheckout = () => {
    const { currentCustomer, currentMovie } = this.state;
    const rentalUrl = `${this.url}rentals/${currentMovie.title}/check-out`;
    
    const dueDate = new Date(Date.now() + 7 * 24*60*60*1000);
    
    axios.post(rentalUrl, null, {
      params: {
        customer_id: currentCustomer.id,
        due_date: dueDate
      }
    })
    .then ((response) => {
      console.log(`Renting ${currentMovie.title} for ${currentCustomer.name}`)
      const feedbackMessage = `Successfully rented ${currentMovie.title} for ${currentCustomer.name}!`

      this.setState({
        currentCustomer: "",
        currentMovie: "",
        feedbackMessage
      })
    })
    .catch(error => {
      const feedbackMessage = `Error renting ${currentMovie.title} for ${currentCustomer.name}`
      this.setState({ 
        error: error.message,
        feedbackMessage
      })
    });
  };

  render() {
    return (
      <div>
        <Router>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/" className="active-title">BlockbusterBay</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
              <li>
                <Link to="/">Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
          </nav>

          <StatusBar 
            currentCustomer={this.state.currentCustomer}
            currentMovie={this.state.currentMovie}
            feedbackMessage={this.state.feedbackMessage}
            onRentalCheckout={this.onRentalCheckout}
          />

          <Route exact path="/" render={() => (
            <Movies
              movieList={this.state.movieList}
              currentMovie={this.state.currentMovie}
              onMovieSelect={this.onMovieSelect}
              queryString={this.state.queryString}
              />
            )}
          />
          <Route path="/customers" render={() => (
            <Customers
              customerList={this.state.customerList}
              currentCustomer={this.state.currentCustomer}
              onCustomerSelect={this.onCustomerSelect}
              />
            )}
          />
          <Route path="/search" render={() => (
            <div>
              <SearchBar
                searchCallback={this.searchCallback}
                onChange={this.queryChanged}
                queryString={this.state.queryString} 
                />
              <SearchMatches
                searchMatches={this.state.searchMatches}
                onMovieAdd={this.onMovieAdd}
                />
            </div>
            )}
          />
        </Router>
      </div>
    )
  }
}

export default VideoStore;

