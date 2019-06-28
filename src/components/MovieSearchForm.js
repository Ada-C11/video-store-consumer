import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./MovieSearchForm.css";

class MovieSearchForm extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      text: ""
    };

    this.state = { ...this.cleared };
  }
  searchMovie = event => {
    event.preventDefault();
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=bb031365ec3e7cc087920804b23e74b1&language=en-US&page=1&query=${
      this.state.text
    }&include_adult=false`;
    axios
      .get(URL)
      .then(response => {
        const movies = response.data.results;
        this.setState({ text: "" });
        
        this.props.getresultcallback(movies);
      })
      .catch(error => {
        alert("Error happened");
        this.setState({ error: error.message });
      });
  };

  onInputChange = event => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  };

  render() {
    return (
      <section>
        <form className="new-card-form__form" onSubmit={this.searchMovie}>
          <h2 className="new-card-form__header">Search for a movie</h2>
          <label>
            Text:
            <input
              name="text"
              type="text"
              value={this.state.text}
              onChange={this.onInputChange}
            />
          </label>
          <input
            className="btn btn-success"
            type="submit"
            name="submit"
            value="Search"
          />
        </form>
      </section>
    );
  }
}
export default MovieSearchForm;
