import React, { Component } from 'react';
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        <h3>HomePage</h3>
        <div><Link to="/library">Movie Rental Library</Link></div> 
        <div><Link to="/search">Search for a Movie</Link></div>
        <div><Link to="/customers">Customers</Link></div>
      </div>
    );
  }
}

export default HomePage;