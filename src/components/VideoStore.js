import React, { Component } from 'react';
import PropTypes from 'prop-types';


class VideoStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMovie: "",
            currentCustomer: "",
        };
    }

    render() {
        return (
            <h3>
                Welcome to the Video Store
            </h3>
        )
    }
}

export default VideoStore;