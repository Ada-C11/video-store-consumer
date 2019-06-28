import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Result from './Result'
import Movie from './Movie'
import "./Search.css"

require('dotenv').config();

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      searchTitle: "",
      errorMessage: "",
    }
  }

  onInputChange = (event) => {
    const updatedState = {};
  
    const field = event.target.name;
    const value = event.target.value;
  
    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSearch = (event) => {
    event.preventDefault();

    this.searchMovie(this.state.searchTitle);

    this.setState({
      searchTitle: "",
    });
  }

  addMovieCallback = (movie) => {
    const movieData = {
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      image_url: movie.image_url,
      external_id: movie.external_id,
      inventory: 15
    }

    axios.post('http://localhost:3000/movies', movieData)
    
    .then((response) => {
      console.log(response.data)
      
      console.log(`successfully added ${response.data.title}`)
    })
    .catch((error) => {
      this.setState({errorMessage: error.message})
    })
    
    
  }

  componentDidMount () {
    this.searchMovie();
  };

  searchMovie = (searchTitle) => {
    const URL = `http://localhost:3000/movies?query=${searchTitle}`

    axios.get(URL)
    .then((response) => {
      const movies = response.data.map((movie, i) => {
        return {
          id: i,
          key: i,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id,
        }
      })
      this.setState({
        result: movies,
      });
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message,
      })
    })
  }

  render() {
    const results = this.state.result.map((movie, i) => {
      return <Result
            addMovieCallback={this.addMovieCallback}
            id={i}
            key={i}
            title={movie.title}
            overview={movie.overview}
            release_date={movie.release_date}
            image_url={movie.image_url}
            external_id={movie.external_id}
      />
    })
    return (
      <div className="search">
        <form className="search-movie-form" onSubmit={this.onSearch}>
          <div>
              <h1 className="search-movie">Search for new Movies</h1>
          </div>
          <div className="search-label search-space">
              <label className="search-form-item-label"
                htmlFor="title">Movie Title:</label>
              <input className="search-form-item-form"
                name="searchTitle"
                onChange={this.onInputChange}
                value={this.state.searchTitle}>
              </input>
              <span><input className="btn btn-primary" type="submit" name="submit" value="Search Movie" /></span>
          </div>
          
          
      </form>
      <div className="row">
        {results}
      </div>
    </div>
    )};
  }

  export default Search;

