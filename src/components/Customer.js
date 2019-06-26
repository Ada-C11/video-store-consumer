import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import './Customer.css';

const Customer = (props) => {
  const onClickButton = () => {
    props.onSelectCustomerCallback(props.id - 1)
  }

  return (
    <div>{props.name}<button onClick={onClickButton}>Select Customer</button></div>
  )
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSelectCustomerCallback: PropTypes.func.isRequired,
};

export default Customer;