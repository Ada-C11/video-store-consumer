import React from 'react';
import Movie from './Movie';
import './MovieLibrary.css';

const MovieLibrary = (props) => {
  const updateSelected = (movieId) => {
    props.allMovies.forEach((movie) => {
      if(movie.id === movieId) {
        console.log(movie)
        props.selectedMovie(movie); // send the whole object
      }
    })
  }

  const displayMovies = () => {
    const displayedMovies = props.allMovies.map((movie) => {
      return(
        <Movie
          key={movie.id}
          movieId={movie.id}
          title={movie.title}
          imgUrl={movie.image_url}
          selectedCallback={updateSelected}
        />
      );
    })
    return displayedMovies;
  }

 
    return (
      <section className="site-content-">
        <div className="all-movies">
          {displayMovies()}
        </div>
      </section>)
  
}

export default MovieLibrary;