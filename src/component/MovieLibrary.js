import React from 'react';
import Movie from './Movie';
import axios from 'axios';
import PropTypes from 'prop-types';
import './MovieLibrary.css'

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
    };
  }

  componentDidMount() {
    this.props.clearErrorCallback();
    this.getMovies();
  }

  getMovies = () => {
    URL = 'http://localhost:3000';
    axios
      .get(URL + '/movies')
      .then(response => {
        const movieList = response.data.map(movie => {
          return movie;
        });

        this.setState({
          movieList: movieList,
        });
      })
      .catch(error => {
        console.log(error.message);
        this.props.errorCallback(error.message);
      });
  };

  movieCollection = () => {
    return this.state.movieList.map(movie => {
      return (
        <Movie
          key={movie.id}
          {...movie}
          selectable={true}
          selectMovie={this.props.selectMovie}
        />
      );
    });
  };

  render() {
    return <div>{this.movieCollection()}</div>;
  }
}

MovieLibrary.propTypes = {
  selectMovie: PropTypes.func,
};

export default MovieLibrary;
