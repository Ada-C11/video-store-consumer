import React from 'react';
import Movie from './Movie';
import PropTypes from 'prop-types';

const MovieList = (props) => {

    const onSelectMovieClick = (movie) => {
        props.onSelectMovieCallback(movie)
    }

    const listOfMovies = props.movieList.map((movie, i) => {
        return (
            <li key={i}>
                <Movie movie={movie} onSelectMovieClick={onSelectMovieClick}/>
            </li>
        )
    })

    return (
        <section>
            <h1>Movie Library</h1>
            <ul>
                {listOfMovies}
            </ul>
        </section>
    )
};

MovieList.propTypes = {
    movieList: PropTypes.array.isRequired, 
    onSelectMovieCallback: PropTypes.func.isRequired,
};

export default MovieList;
