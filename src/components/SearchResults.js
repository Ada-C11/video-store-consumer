import React from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'
import Message from './Message.js'

const SearchResults = (props) => {

    const selectMovie = (event) => {
      const movie = props.movieData[event.target.id]
      props.addMovieCallback(movie);
    }

    const movies = props.movieData.map((movie, i) => {
        return (
            <div key={i}>
                <li >{movie.title}</li>
                <button 
                    id={i}
                    onClick={selectMovie}>
                        Add to Library
                </button>
            </div>
            )
    });

    return (
        <div>
            {movies}
        </div>
    );
}

export default SearchResults

SearchResults.propTypes = {
    movieData: PropTypes.array,
    addMovieCallback: PropTypes.func
}