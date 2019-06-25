import React, { Component } from 'react';
import axios from 'axios';

import Movie from './Movie';

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      currentMovie: undefined,
    }
  }

  url = "https://enigmatic-chamber-40825.herokuapp.com/"

  componentDidMount() {
    axios.get(this.url)
    .then((response) => {
      console.log(response.data);

      const movieList = response.data.map((movie) => {
        const newMovie = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id,
        }
        return newMovie;
      })

      console.log(movieList);

      this.setState({ movieList });
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
  }

  onMovieSelect = (movieID) => {
    const currentMovie = this.state.movieList.filter(movie => movie.id === movieID)[0]

    console.log(currentMovie)
    this.setState({ currentMovie });
  };

  render() {
    const displayMovies = this.state.movieList.map((movie, i) => {
      return <Movie
                key = {i}
                id = {movie.id}
                title = {movie.title}
                overview = {movie.overview}
                release_date = {movie.release_date}
                image_url = {movie.image_url}
                external_id = {movie.external_id}
                onMovieSelect = {this.onMovieSelect}
                />
    })

    const displayCurrMovie = (this.state.currentMovie === undefined) ? "None" : this.state.currentMovie.title
    
    return (
      <div>
        Currently selected movie: { displayCurrMovie }
        { displayMovies }
      </div>
    )
  }
}

export default Movies;