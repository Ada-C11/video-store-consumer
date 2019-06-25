import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchItem extends Component {

    constructor(props) {
        super(props);
        const { title, overview, id, releaseDate, imageURL, onAddMovieCallback } = this.props;
    }

    // selectMovie = () => {
    //     const movieObject = {
    //         title: title
    //     }
    // }
    render() {
        const { title, overview, id, releaseDate, imageURL, onAddMovieCallback } = this.props;
        return (
            <div className='movie-item'>
                <h3 className='movie-title'> {title} </h3>
                <p className='movie-description'> {overview} </p>
                <img className='movie-image' src={imageURL} alt={title} />
                <button className="add-movie-button" onClick={() => {onAddMovieCallback(this.props)}}>Add to Library</button>
            </div >
        )
    };
}


export default SearchItem