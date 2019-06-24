import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = (props) => {

    console.log("This SHOULD be the movie data...")
    console.log(props.movieData);
    const movies = props.movieData.map((movie, i) => {
        return <li key={i}>{movie.title}</li>
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