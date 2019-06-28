import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './OverdueMovies.css';

const OverdueMovies = (props) => {
  const overdueMoviesCall = () => {
    axios.get('http://localhost:3001/rentals/overdue')
    .then((response) => {
      const overdueMovieCollection = response.data.map((overdueMovie) => {
        return <li className="overdueMovie">{overdueMovie.title}</li>
      })
      props.setOverdueMoviesCallback(overdueMovieCollection)
    })
    .catch((error) => {
      props.setErrorOverdueCallback(error)
    });
  }
  return (
    <div className="overdue_container">
      <Button className="format" variant="dark" onClick={overdueMoviesCall}>View Overdue Movies</Button>
      {props.overdueMovies && <ul>{props.overdueMovies.length > 0 ? props.overdueMovies : "No Movies are Overdue!" }</ul>}
    </div>
  )
}

OverdueMovies.propTypes = {
  setOverdueMoviesCallback: PropTypes.func.isRequired,
  overdueMovies: PropTypes.array,
};

export default OverdueMovies;