import React from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'
import './Movie.css'
import Message from './Message.js'

const SearchResults = (props) => {

    const selectMovie = (event) => {
      const movie = props.movieData[event.target.id]
      props.addMovieCallback(movie);
    }

    const movies = props.movieData.map((movie, i) => {
        return (
            <div className="movie" key={i}>
                <img className="movie__image" src={movie.image_url}/>
                <div className="movie__content">
                    <p>{movie.title}</p>
                    <p>{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <button 
                        id={i}
                        className="movie__button"
                        onClick={selectMovie}>
                            Add to Library
                    </button>
                </div>
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