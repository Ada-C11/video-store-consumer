import React, { Component } from 'react';
// import axios from 'axios';
import Movie from './Movie';

// const URL_MOVIES = 'http://localhost:4000/movies';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMovies: this.props.allMovies,
      selectedMovie: '',
    }
  }
  
  updateSelected = (movieId) => {
    this.state.allMovies.forEach((movie) => {
      if(movie.id === movieId) {
        this.props.selectedMovie(movie.title);
        this.setState({
          selectedMovie: movie.tile,
        })
      }
    })
  }

  displayMovies = () => {
    const displayedMovies = this.state.allMovies.map((movie) => {
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