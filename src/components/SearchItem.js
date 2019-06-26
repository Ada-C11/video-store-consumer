import React from 'react';
import PropTypes from 'prop-types';
import './SearchItem.css';

const SearchItem = (props) => {
    const { title, overview, imageURL, addMovieCallback } = props;
    return (
        <div className='movie-item'>
            <h3 className='movie-title'> {title} </h3>
            <p className='movie-description'> {overview} </p>
            <img className='movie-image' src={imageURL} alt={title} />
            <span className="add-movie-button" onClick={() => { addMovieCallback(props) }}>Add to Library</span>
        </div >
    )

}

SearchItem.propTypes = {
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    addMovieCallback: PropTypes.func.isRequired
}

export default SearchItem