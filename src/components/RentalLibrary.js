import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import './RentalLibrary';

class RentalLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState( {movies: response.data} );
      this.props.getMovieCallback(this.state.movies);
    })
    .catch((error) => {
      this.setState({ 
        error: error.message 
      });
    });
  }

  selectMovieCallback = (id) => {
    this.props.selectMovieCallback(id);
  }

  render() {
    const allRentals = this.state.movies.map((movie) => {
      return <Movie
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        release_date={movie.release_date}
        image_url={movie.image_url}
        external_id={movie.external_id}
        selectMovieCallback={this.selectMovieCallback}
        />

    });

    return (
      <div >
        <div>
          <h1 className="movie movie__header">Rent Today!</h1>
          <div className="row">
            {allRentals}
          </div>
        </div>
      </div>
    )
  }
}

RentalLibrary.propTypes = {
  selectMovieCallback:PropTypes.func,
  getMovieCallback:PropTypes.func,
};

export default RentalLibrary;
