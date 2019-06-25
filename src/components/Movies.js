import React from 'react';
import Movie from './Movie';

const Movies = (props) => {
    console.log(props.movieList)

    // const selectMovie = (event) => {
    //     props.onSelectMovieCallback(event.target.value)
    // }

    const listOfMovies = props.movieList.map((movie, i) => {
        return (
            <li key={i}>
                <Movie movie={movie}/>
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
