import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import MoviesSearchBar from './MoviesSearchBar'

class MoviesSearchPage extends Component {
  render() {
    return (
      <div>
        <h3>MoviesSearchPage</h3>
        <MoviesSearchBar />
      </div>
    );
  }
}

export default MoviesSearchPage;