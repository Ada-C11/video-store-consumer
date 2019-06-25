import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'

class Customers extends Component {
    constructor() {
        super();

        this.state = {
            customers: [],
            error: null
        }

    }

    componentDidMount() {
        axios.get();
    }

    render() {
        return (
            <div>
                <p>Inside Customer List</p>
            </div>
        );
    }
}

export default Customers