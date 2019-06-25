import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
import axios from 'axios';


class VideoStore extends Component {
    constructor() {
        super();

        this.state = {
            currentMovie: "",
            currentCustomer: 0,
            customers: [],
        };
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

        return (<h1>Welcome to our Video Store</h1>)
    }
}

export default VideoStore;