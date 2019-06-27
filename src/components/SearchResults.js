import React from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'
import './Movie.css'

const SearchResults = (props) => {

    const selectMovie = (event) => {
        const movie = props.movieData[event.target.id]
        console.log(movie);
        const postURL = 'http://localhost:3002/movies/add-movie'
        axios.post(postURL, null, {
            params: {
                external_id: movie.external_id,
                image_url: movie.image_url,
                overview: movie.overview,
                release_date: movie.release_date,
                title: movie.title
            }
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error.message)
        })
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
}