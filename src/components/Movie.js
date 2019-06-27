import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = (props) => {
    const movie = props.movie;

    const onHandleClick = () => {
        props.onSelectMovieClick(movie);
    }

    const onSearchResultClick = () => {
        props.addSearchToLibraryCallback(movie);
    }

    let button = '';
    if (props.isSearchResult) {
        if (props.alreadyInLibrary === false) {
            button = <button onClick={onSearchResultClick} className='btn btn-dark'>Add To Library</button>
        } else {
            button = <p className='already-in-library'>Already in Rental Library</p>
        }
    } else {
        button = <button onClick={onHandleClick} className='btn btn-dark'>Select for Rental</button>
    };

    const formatDate = (date) => {
        let formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-US');
    };

    return (
        <section>
            <img src={movie.image_url} alt={`movie poster for ${movie.title}`}/>
            <h4>{movie.title}</h4>
            {button}
            <section className='movie-information'>
                <p>Release date: {formatDate(movie.release_date)}</p>
                <p>{movie.overview}</p>
            </section>
        </section>
    )
};

Movie.propTypes = {
    movie: PropTypes.object, 
    addSearchToLibraryCallback: PropTypes.func,
    onSelectMovieClick: PropTypes.func,
};

export default Movie;
