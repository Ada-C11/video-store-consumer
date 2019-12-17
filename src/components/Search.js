import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.css';
import axios from 'axios';
import MovieResult from './MovieResult';

class Search extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
      results: [],
      titleSearch: '',
      errorMessage: null,
      confirmation: '',
      };
    }

  onChangeHandler = (event) => {
    const field = {}
    field[event.target.name] = event.target.value;
  
    this.setState(field);
  }
        
  searchMovie = (event) => {
    event.preventDefault();

    this.searchMovieResults(this.state.titleSearch);

    this.setState({
      titleSearch: '',
    });
  }

  componentDidMount () {
    this.searchMovieResults();
  }

  searchMovieResults = (titleSearch) => {
      axios.get(`http://localhost:3007/movies?query=${titleSearch}`)
        .then((response) => {
          this.setState({
            results: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: `${error.message} when retrieving movies.`,
          });
        });
  }

    addMovieCallback = (movie) => {
      const addedMovieInfo = {
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        image_url: movie.image_url,
        external_id: movie.external_id,
        inventory: 5
      }

      axios.post('http://localhost:3007/movies/', addedMovieInfo)
       .then((response) => {
        this.setState({
          confirmation: `Succesfully added ${response.data.title} to library.`,
          });
          this.props.addMovieCallback(response.data);
        })
       .catch((error) => {
         console.log(error.message)
        this.setState({
         errorMessage: `${error.response.data.message} when adding movie to library.`
        })
      });
  }
    
    render() {
      const movieResults = this.state.results.map((movie, i) => {
        if (movie.release_date !== null && parseInt(movie.release_date.substr(0, 4),10) < 2000) {
        return (
          <MovieResult
          key={i}
          title={movie.title}
          image_url={movie.image_url}
          overview={movie.overview}
          external_id={movie.external_id}
          release_date={movie.release_date}
          addMovieToLibraryCallback={this.addMovieCallback}
          />
        )
        }
      });
      return (
      <div>
        <div className="validation-errors-display">    
          {this.state.errorMessage}
        </div>
        <div className="validation-confirmation">
          {this.state.confirmation}
        </div>
        <form className="search-movie-form" onSubmit={this.searchMovie}>
          <div className="search-movie">
              <h3 className="search-movie__header">Search Movie</h3>
          </div>
          <div>
              <label 
                className="search-movie-form__form-label" 
                htmlFor="title">Movie Title</label>
              <input className="search-movie-form__form-input"
                name="titleSearch"
                placeholder="Movie Title"
                onChange={this.onChangeHandler}
                value={this.state.titleSearch}
                required>
              </input>
          </div>
          <input className="search-movie-form__form-button" type="submit" name="submit" value="Search Movie" />
      </form>
      <div className="movie">
        {movieResults}
      </div>
      </div>
      )};
  }
    
  Search.propTypes = {
    searchMovieResults: PropTypes.func,
    };
  
  export default Search;