import React, { Component } from "react";
// import logo from "./logo.svg";
import "./MovieSearch.css";
import axios from "axios";
import MovieSearchForm from "./MovieSearchForm";

class MovieSearch extends Component {

  render() {
    return (
      <div>
        <div>
          <MovieSearchForm getresultcallback={this.getresult} />
        </div>
      </div>
    );
  }
}

export default MovieSearch;
