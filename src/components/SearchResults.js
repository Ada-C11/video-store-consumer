import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = (props) => {
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