import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './Home.css';

const Home = (props) => {
  const overdueMovies = () => {
    axios.get('http://localhost:3001/rentals/overdue')
    .then((response) => {
      const overdueMovieCollection = response.data.map((overdueMovie) => {
        console.log(overdueMovie.title)
        return <li>{overdueMovie.title}</li>
      })
      props.setOverdueMoviesCallback(overdueMovieCollection)
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  return (
    <div>
      <button onClick={overdueMovies}>Overdue Movies</button>
      {props.overdueMovie && <ul>{props.overdueMovie}</ul>}
    </div>
  )
}

Home.propTypes = {
  // movie: PropTypes.object.isRequired,
  // customer: PropTypes.object.isRequired,
  // checkoutDate: PropTypes.string.isRequired,
  // dueDate: PropTypes.string.isRequired,
};

export default Home;