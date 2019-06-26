import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import Table from 'react-bootstrap/Table'

// import './Library.css';

const Library = (props) => {
  const movieCollection = props.library.map((movie, i) => {
    return <Movie key={i} 
            movie={movie} 
            viewMovieDetails={props.expandedMovies[movie.id]} 
            onClickDetailsCallback={props.onClickDetailsCallback} 
            onSelectMovieCallback={props.onSelectMovieCallback}/>
   });
   
  return (
    <section>
      <h2>Library</h2>
      <thead>
        <tr>
          <th>Movie Title</th>
        </tr>
      </thead>
      <Table>
        <tbody>
          {movieCollection}
        </tbody>
      </Table>
    </section>
  )
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  onClickDetailsCallback: PropTypes.func.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Library;