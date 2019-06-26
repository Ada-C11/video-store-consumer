import React from 'react';
import Movie from './Movie';

const Movies = (props) => {

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

export default Movies;
