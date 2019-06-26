import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
        <p>
          <Link to="/library">Movie Rental Library</Link>
          <Link to="/search">Search for a Movie</Link>
          <Link to="/customers">Customers</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;