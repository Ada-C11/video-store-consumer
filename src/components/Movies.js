import React from 'react';

const Movies = (props) => {
    console.log(props.movieList)

    const listOfMovies = props.movieList.map((movie, i) => {
        return (
            <li key={i}>
                <img src={movie.image_url} alt={`movie poster for ${movie.title}`}/>
                <h4>{movie.title}</h4>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
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
