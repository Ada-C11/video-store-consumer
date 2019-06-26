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
            id: movie.external_id,
          }
        });
        console.log(movieList);
        this.setState({
          movies: movieList,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  selectMovie = (movieIndex) => {
    console.log(this.props.selectMovieCallback)
    const selectedMovie = this.state.movies[movieIndex]
    this.props.selectMovieCallback(selectedMovie);


  }

  render() {
    const movies = this.props.generateMovieComponentsCallback(this.state.movies, true, this.selectMovie);

    return (
      <div>
        <h3>Movie Library</h3>
        <div className="row product-list">
          { movies }
        </div>
      </div>
    )
  }
}

export default Library;