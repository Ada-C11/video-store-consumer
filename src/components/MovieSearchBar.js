import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";

class MovieSearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      query: "",
      clickHandler: this.props.searchCallback,
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

  submitSearchResults = () => {
    this.state.clickHandler(this.state.query);
  };

 

  render() {

  
    return (
      <div>
        <h5>MoviesSearchBar</h5>
          <input type="text" name="query" onChange={this.onInputChange} value={this.state.query} />
          <button onClick={this.submitSearchResults}>Search</button>
      </div>
    );
  }
}

export default MovieSearchBar;