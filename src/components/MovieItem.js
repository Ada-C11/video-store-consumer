import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieItem.css'

class MovieItem extends Component {

    render() {
        const { title, overview, imageURL, onSelectMovieCallback } = this.props;
        return (
            <div className='movie-item'>
                <h3 className='movie-title'> {title} </h3>
                <p className='movie-description'> {overview} </p>
                <img className='movie-image' src={imageURL} alt={title} />
                <button className="select-movie-button" onClick={() => {onSelectMovieCallback(this.props)}}>Select Movie</button>
            </div >
        )
    };
}

MovieItem.propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    onSelectMovieCallback: PropTypes.func.isRequired
}

export default MovieItem