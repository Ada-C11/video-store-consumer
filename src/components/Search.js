import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Result from './Result'
import Movie from './Movie'

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
      <div>
        <form className="search-movie-form" onSubmit={this.onSearch}>
          <div className="search-movie">
              <h3 className="search-movie__header">Search Movie</h3>
          </div>
          <div>
              <label 
                className="search-movie-form__form-label" 
                htmlFor="title">Movie Title</label>
              <input className="search-movie-form__form-input"
                name="searchTitle"
                onChange={this.onInputChange}
                value={this.state.searchTitle}>
              </input>
          </div>
          
          <input className="search-movie-form__form-button" type="submit" name="submit" value="Search Movie" />
      </form>
      <div>
        {results}
      </div>
    </div>
    )};
  }

  export default Search;

