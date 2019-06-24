import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

class MoviesSearchBar extends Component {
  render() {
    return (
      <div>
        <h5>MoviesSearchBar</h5>
        <form>
          <input type="text" name="query" value="" defaultValue="Type in your search terms" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default MoviesSearchBar;