import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    }
  }

  componentDidMount() {

    axios.get(this.props.url)
      .then((response) => {
        const movieList = response.data.map((movie) => {
          return {
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            external_id: movie.external_id,
            inventory: movie.inventory,
            id: movie.id
          }
        });
        this.setState({
          movies: movieList.reverse(),
        })
      })
      .catch((error) => {
        this.props.addErrorMessageCallabck(`Unable to load movies. ${error.message}`, 'alert-warning')
        console.log(error.message);
      })
  }
  selectMovie = (movieIndex) => {
    const selectedMovie = this.state.movies[movieIndex]
    this.props.selectMovieCallback(selectedMovie);
  }

  render() {
    const movies = this.props.generateMovieComponentsCallback(this.state.movies, true, this.selectMovie);

    return (
      <div>
        <div className="video-store-title">Movie Library</div>
        <div className="row product-list">
          {movies}
        </div>
      </div>
    )
  }
}

export default Library;