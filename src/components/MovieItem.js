import React from 'react';
import PropTypes from 'prop-types';

const MovieItem = (props) => {
    const { key, title, overview, id, releaseDate, imageURL } = props;
    return (
        <div className='movie-item'>
            <h3 className='movie-title'> {title} </h3>
            <p className='movie-description'> {overview} </p>
            <img className = 'movie-image' src={imageURL} alt = {title} />

        </div >
    )
}

export default MovieItem