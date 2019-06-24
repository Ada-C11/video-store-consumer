import React, { Component } from 'react';
import PropTypes from 'prop-types';


// import './MovieLibrary.css';


class MovieLibrary extends Component {
    constructor() {
        super();

        this.state = {

        };
    }
    render() {
        return (
            <section className="movielibrary-button">
                <input 
                type="button" 
                value="Choose Movie" 
                className="choose-movie-btn" 
                onClick={this.props.currentMovieCallback} />
            </section>
        );
    }
}

MovieLibrary.propTypes = {
    currentCustomerCallback: PropTypes.func.isRequired,
    currentMovieCallback: PropTypes.func.isRequired,
}

export default MovieLibrary;