import React from 'react';
import PropTypes from 'prop-types';
import './MovieItem.css'

const MovieItem = (props) => {

    const { title, overview, imageURL, onSelectMovieCallback } = props;
    return (
        <div className='movie-item'>
            <h3 className='movie-title'> {title} </h3>
            <p className='movie-description'> {overview} </p>
            <img className='movie-image' src={imageURL} alt={title} />
            <span className="select-movie-button" onClick={() => { onSelectMovieCallback(props) }}>Select Movie</span>
        </div >
    )
};


MovieItem.propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    onSelectMovieCallback: PropTypes.func.isRequired
}

export default MovieItem