import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
import Table from 'react-bootstrap/Table';
import './Library.css';

const Library = (props) => {
  const movieCollection = props.library.map((movie, i) => {
    return <Movie key={i} 
            movie={movie} 
            viewMovieDetails={props.expandedMovies} 
            onClickMovieDetailsCallback={props.onClickMovieDetailsCallback}
            onCloseMovieDetailsCallback={props.onCloseMovieDetailsCallback}
            onSelectMovieCallback={props.onSelectMovieCallback}
            onDeselectMovieCallback={props.onDeselectMovieCallback}
            deselectedMovie={props.deselectedMovie}
            selectedMovie={props.selectedMovie}/>
   });

  return (
    <section className="library_container">
      <h1>Library</h1>
      
      <Table striped size="sm">
        <tbody>
          {movieCollection}
        </tbody>
      </Table>
    </section>
  )
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  expandedMovies: PropTypes.object,
  onSelectMovieCallback: PropTypes.func.isRequired,
  onClickMovieDetailsCallback: PropTypes.func.isRequired,
};

export default Library;