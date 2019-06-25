import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

class Library extends Component {
  constructor() {
    super();

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

  render() {
    const movies = this.props.generateMovieComponentsCallback(this.state.movies, true);

    return(
      <div>
        { movies }  
      </div>
    )
  }
}

export default Library;