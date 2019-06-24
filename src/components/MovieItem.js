import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieItem extends Component {

    constructor(props) {
        super(props);
        const { title, overview, id, releaseDate, imageURL, onSelectMovieCallback } = this.props;
    }

    // selectMovie = () => {
    //     const movieObject = {
    //         title: title
    //     }
    // }
    render() {
        const { title, overview, id, releaseDate, imageURL, onSelectMovieCallback } = this.props;
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


export default MovieItem