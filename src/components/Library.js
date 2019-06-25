import React from 'react';
import MovieCard from './MovieCard';

const Library = (props) => {
  const {movieLibrary} = props
  const movieCards = movieLibrary.map((movie, i) => {
    return (
      <MovieCard key={i} movie={movie} selectMovie={props.selectMovie} />
    )
  })
  return (
    <div>
      <p>Movie Library</p>
      { movieCards }
    </div>
  );
};



export default Library;