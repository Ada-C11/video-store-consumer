import React from 'react';
import Movie from './Movie';
import './MovieList.css';
import PropTypes from 'prop-types';

const MovieList = (props) => {

    const onSelectMovieClick = (movie) => {
        props.onSelectMovieCallback(movie)
    }

    const listOfMovies = props.movieList.map((movie, i) => {
        return (
            <li key={i} className='library-movie-item'>
                <Movie movie={movie} onSelectMovieClick={onSelectMovieClick}/>
            </li>
        )
    })

    return (
        <section>
            <h1>Movie Library</h1>
            <ul className='library-movie-list'>
                {listOfMovies}
            </ul>
        </section>
    )
};

MovieList.propTypes = {
    movieList: PropTypes.array.isRequired, 
    onSelectMovieCallback: PropTypes.func,
};

export default MovieList;
