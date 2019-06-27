import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './Log.css';

const Log = (props) => {
  const overdueMoviesCall = () => {
    axios.get('http://localhost:3001/rentals/overdue')
    .then((response) => {
      const overdueMovieCollection = response.data.map((overdueMovie) => {
        return <li>{overdueMovie.title}</li>
      })
      props.setOverdueMoviesCallback(overdueMovieCollection)
    })
    .catch((error) => {
      props.setErrorOverdueCallback(error)
    });
  }
  return (
    <div>
      <button onClick={overdueMoviesCall}>Overdue Movies</button>
      {props.overdueMovies && <ul>{props.overdueMovies.length > 0 ? props.overdueMovies : "No Movies are Overdue!" }</ul>}
    </div>
  )
}

Log.propTypes = {
  setOverdueMoviesCallback: PropTypes.func.isRequired,
  overdueMovies: PropTypes.array,
};

export default Log;