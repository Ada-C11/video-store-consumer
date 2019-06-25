import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Movie extends Component {
  render() {
    return (
      <section>
        <h1>{this.props.title}</h1>
        <p>{this.props.overview}</p>
        <p>Released: {this.props.releaseDate}</p>
      </section>
    );
  }
};

export default Movie;