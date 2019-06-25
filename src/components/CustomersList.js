import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
import axios from 'axios';

class CustomersList extends Component {
  constructor() {
    super();

    this.state = {
      customers: [],
    }
  }
  

  render() {
    return (
      <Customer currentCustomerCallback={this.currentCustomerCallback} />
    )
  }
}

export default CustomersList