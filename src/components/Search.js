import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Search.css';
import axios from 'axios';

require('dotenv').config();

class Search extends Component {
  constructor(props) {
      super(props);
  
      this.state = {
      result: [],
      titleSearch: '',
      errorMessage: '',
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
    const externalUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${titleSearch}&page=1&include_adult=false`;
    console.log(externalUrl);
      axios.get(externalUrl)
        .then((response) => {
          const movies = response.data.map((movie) => {
            return {
              id: movie.id,
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
            errorMessage: `${error.message} when retrieving movies.`,
          });
        });
  }

    // addMovie = (movieId) => {
    //   console.log(this.state);
    //   const addedMovie = this.state.searchResults.find(movie => movie.external_id === movieId)
    //   const addedMovieInfo = {
    //     title: addedMovie.title,
    //     overview: addedMovie.overview,
    //     release_date: addedMovie.release_date,
    //     image_url: addedMovie.image_url,
    //     external_id: addedMovie.external_id,
    //     inventory: 5
    //   }
  
    //   axios.post('http://localhost:3000/movies/', addedMovieInfo)
    //    .then((response) => {
    //      this.props.searchCallback(`Successfully added ${addedMovieData.title} to library`)
    //    })
    //    .catch((error) => {
    //      console.log(`Error: ${error.message}`);
    //    })
    // }
    
    render() {
      // const result = this.state.result.map((movie, i) => {
      //   return 
      //   <div>
      //     <p><movie.title></p>
      //   </div>

      // });
      return (
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
                onChange={this.onChangeHandler}
                value={this.state.titleSearch}>
              </input>
          </div>
          <input className="search-movie-form__form-button" type="submit" name="submit" value="Search Movie" />
      </form>
      )};
  }
    
  Search.propTypes = {
      searchMovieResults: PropTypes.func.isRequired,
    };
  
  export default Search;