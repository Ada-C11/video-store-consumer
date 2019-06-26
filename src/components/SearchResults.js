import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = (props) => {

    const selectMovie = (event) => {
        // console.log(event.target.id)
        console.log(props.movieData)
        console.log(props.movieData[0])
        console.log(props.movieData[event.target.id])
    }

    const movies = props.movieData.map((movie, i) => {
        return (
            <div key={i}>
                <li >{movie.title}</li>
                <button 
                    id={i}
                    onClick={selectMovie}>
                        Select Movie
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
}