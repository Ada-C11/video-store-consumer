import React, { Component } from "react"
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor() {
    super();

    this.cleared = {
      title: "",
    }

    this.state = {...this.cleared}
  }

  onInputChange = (event) => {
    const updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  movieSearch = (event) => {
    event.preventDefault();

    const title = this.state;

    this.props.movieSearchCallback(title)

    this.setState({...this.cleared});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.movieSearch}>
          <h3>Search For Movies</h3>
          <label>Title: </label>
          <input 
            name="title" 
            type="text" 
            onChange={this.onInputChange}
            value={this.state.title}>
          </input>
          <input type="submit" name="submit" value="Search for Movie" />
        </form>
      </div>
    )
  }
}

export default SearchForm