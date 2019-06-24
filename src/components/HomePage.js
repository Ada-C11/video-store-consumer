import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
        <p>
          <Link to="/movies">Movies</Link>
          <Link to="/movies/search">Search for a Movie</Link>
          <Link to="/customers">Customers</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;