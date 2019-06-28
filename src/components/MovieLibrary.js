import React, { Component } from 'react';
import Movie from './Movie';
import './MovieLibrary.css';

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
      <section className="site-content-">
        {/* <h3 className="movie-library">Movie Library</h3> */}
        <div className="all-movies">
          {this.displayMovies()}
        </div>
      </section>)
  }
}

export default MovieLibrary;