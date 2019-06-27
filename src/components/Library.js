import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import Table from 'react-bootstrap/Table';
import './Library.css';

const Library = (props) => {
  const movieCollection = props.library.map((movie, i) => {
    return <Movie key={i} 
            movie={movie} 
            viewMovieDetails={props.expandedMovies[movie.id]} 
            onClickDetailsCallback={props.onClickDetailsCallback} 
            onSelectMovieCallback={props.onSelectMovieCallback}/>
   });
   
  return (
    <section className="library_container">
      <h1>Library</h1>
      
      <Table striped>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
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