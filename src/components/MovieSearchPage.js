import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import MovieSearchBar from './MovieSearchBar'

class MovieSearchPage extends Component {
  constructor () {
    super();
    this.state = {
      searchResults: [],
    }
  }
  render() {
    return (
      <div>
        <h3>MoviesSearchPage</h3>
        <MovieSearchBar />
      </div>
    );
  }
}

export default MovieSearchPage;