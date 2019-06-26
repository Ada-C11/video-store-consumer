import React from 'react';

const Movie = (props) => {
    const movie = props.movie;

    const onHandleClick = () => {
        console.log('i\'m in movie and i\'ve been clicked!');
        console.log('i have clicked movie', movie.title);
        props.onSelectMovieClick(movie);
    }

    const onSearchResultClick = () => {
        props.addSearchToLibraryCallback(movie);
    }

    let button = '';
    if (props.isSearchResult) {
        if (props.alreadyInLibrary === false) {
            button = <button onClick={onSearchResultClick}>Add To Library</button>
        } else {
            button = <p>Already in Rental Library</p>
        }
    } else {
        button = <button onClick={onHandleClick}>Select for Rental</button>
    };

    return (
        <section>
            <img src={movie.image_url} alt={`movie poster for ${movie.title}`}/>
            <h4>{movie.title}</h4>
            <p>{movie.external_id}</p>
            {button}
            <p>Release date: {movie.release_date}</p>
            <p>{movie.overview}</p>
        </section>
    )
};

export default Movie;
