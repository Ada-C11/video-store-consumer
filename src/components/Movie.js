import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Movie extends Component {
  render() {
    const {id, title, overview, release_date, buttonName} = this.props;
    return (
      <tr>
        <th scope="row">{id}</th>
        <td>{title}</td>
        <td>{overview}</td>
        <td>{release_date}</td>
        <td>
          <button className="btn btn-primary" >
            {buttonName}
          </button>
        </td>
      </tr>
    );
  }
};

export default Movie;