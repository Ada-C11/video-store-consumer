import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Customer from './Customer';
// import axios from 'axios';


class VideoStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMovie: "",
            currentCustomer: 0,
        };
    }

    currentCustomerCallback = (customerID) => {
        this.setState({
            currentCustomer: customerID,
        })
    }

    currentMovieCallback = (movie) => {
        this.setState({
            currentMovie: movie,
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="current_selections">
                <p>Current Selections Will Go Here </p>
                <p>{this.state.currentCustomer} </p>;
            </div>
        )
    }
}

VideoStore.propTypes = {
    currentCustomerCallback: PropTypes.func
}

export default VideoStore;