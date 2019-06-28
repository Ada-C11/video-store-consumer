import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import MoviePopup from './MoviePopup2'

import Movie from './Movie';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    }
  }

  searchCallback = (input) => {
    this.setState({
      queryString: input
    });


    axios.get(this.props.url, { params: { query: input } })
      .then((response) => {
        const movieList = response.data.map((movie) => {

          return {
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            id: movie.external_id,
          }
        });

        this.setState({
          movies: movieList,
        })
      })
      .catch((error) => {
        this.props.addErrorMessageCallback("Unable to load movies", "alert-warning")
      })
  };

  postMovieToLibrary = (movieIndex) => {
    const url = this.props.url + 'movies/';
    const movie = this.state.movies[movieIndex];

    axios.post(url, movie)
      .then((response) => {
        this.props.addErrorMessageCallback("Movie successfully added to Library", "alert-info")
      })
      .catch((error) => {
        this.props.addErrorMessageCallback("Unable to add movie to Library", "alert-warning")
      })
  }


  render() {
    const movies = this.props.generateMovieComponentsCallback(this.state.movies, false, this.postMovieToLibrary);
    return (
      <section>
        <div className="video-store-title">Search our Database</div>
        <SearchForm
          searchCallback={this.searchCallback}
        />
        <div className="row product-list">
          {movies}
        </div>
        <div>

        </div>
      </section>
    )
  }
}

Search.propTypes = {
  url: PropTypes.string,
}

export default Search;