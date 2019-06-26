import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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

  componentDidMount () {
    this.searchMovie();
  };

  searchMovie = (searchTitle) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTitle}&page=1&include_adult=false`

    axios.get(URL)
    .then((response) => {
      const movies = response.data.results.map((movie) => {
        return {
          id: movie.id,
          key: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: `http://image.tmdb.org/t/p/w185//${movie.poster_path}`,
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

      return <Movie
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

