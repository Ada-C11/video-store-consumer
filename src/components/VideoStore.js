import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieLibrary from './MovieLibrary';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class VideoStore extends Component {
    constructor() {
        super();

        this.state = {
            currentMovie: "",
            currentCustomer: 0
        };
    }

    componentDidMount() {

    }

    currentCustomerCallback = (id) => {
        this.setState({
            currentCustomer: id,
        })
    }

    currentMovieCallback = (movie) => {
        this.setState({
            currentMovie: movie,
        })
    }

    render() {
        return (
            <section className="movielibrary-button">
                <MovieLibrary
                    currentMovieCallback={this.currentMovieCallback}
                    currentCustomerCallback={this.currentCustomerCallback}
                />
            </section>
        );
    }
}

export default VideoStore;