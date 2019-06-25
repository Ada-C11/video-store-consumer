import React, { Component } from 'react';
import axios from 'axios';

import Movie from './Movie';
import SearchBar from './SearchBar';

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

  // render() {
  //   const displayMovies = this.state.movieList.map((movie, i) => {
  //     return <Movie
  //               key = {i}
  //               id = {movie.id}
  //               title = {movie.title}
  //               overview = {movie.overview}
  //               release_date = {movie.release_date}
  //               image_url = {movie.image_url}
  //               external_id = {movie.external_id}
  //               onMovieSelect = {this.onMovieSelect}
  //               />
  //   })

    render() {

      const displayMovies = this.state.movieList.flatMap(
        ({ id, title, overview, release_date, image_url, external_id }) => {
          // Construct a RegExp object with 'i' so that the match is case
          // insensitive.
          const query = new RegExp(this.props.queryString, 'i');
    
          if (title.match(query)) {
            return [<Movie
                      key = {id}
                      id = {id}
                      overview = {overview}
                      release_date = {release_date}
                      image_url = {image_url}
                      external_id = {external_id}
                      onMovieSelect = {this.onMovieSelect}
                      />];
          } else {
            return [];
          }
        })
    

      // const displayMovies = this.state.movieList.map((movie, i) => {
      //   return <Movie
      //             key = {i}
      //             id = {movie.id}
      //             title = {movie.title}
      //             overview = {movie.overview}
      //             release_date = {movie.release_date}
      //             image_url = {movie.image_url}
      //             external_id = {movie.external_id}
      //             onMovieSelect = {this.onMovieSelect}
      //             />
      // })

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