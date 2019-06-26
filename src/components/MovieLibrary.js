import React, { Component } from 'react';
import Movie from './Movie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
  }
  
  updateSelected = (movieId) => {
    this.props.allMovies.forEach((movie) => {
      if(movie.id === movieId) {
        this.props.selectedMovie(movie.title);
      }
    })
  }

  displayMovies = () => {
    const displayedMovies = this.props.allMovies.map((movie) => {
      return(
        <Movie
          key={movie.id}
          movieId={movie.id}
          title={movie.title}
          imgUrl={movie.image_url}
          selectedCallback={this.updateSelected}
        />
      );
    })
    return displayedMovies;
  }

  render() {
    return (
      <section>
        <h3>Movie Library</h3>
        {this.displayMovies()}
      </section>)
  }
}

export default MovieLibrary;