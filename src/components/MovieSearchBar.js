import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

class MovieSearchBar extends Component {

  constructor () {
    super();
    this.state = {
      query: "",
    }
  }

  onInputChange = (event) => {
    console.log(event.target);
    const updatedState = this.state;

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  };

 

  render() {

  
    return (
      <div>
        <h5>MoviesSearchBar</h5>
        <form>
          <input type="text" name="query" onChange={this.onInputChange} value={this.state.query} defaultValue="Type in your search terms" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default MovieSearchBar;