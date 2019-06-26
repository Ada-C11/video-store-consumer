import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';

class RentalLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      moreMovies: '',
    };
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = () => {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({
        movies: response.data,
      });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
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
        getMovieTitleCallback={this.props.getMovieTitleCallback}
        />

    });


    return (
      <div >
        <div className="rentals">
          {allRentals}
        </div>
      </div>
    )
  }
}

RentalLibrary.propTypes = {
  getMovieTitleCallback:PropTypes.func,
};

export default RentalLibrary;
