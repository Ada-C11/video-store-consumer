import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

// import axios from 'axios';
// import './Customer.css';

const Customer = (props) => {
  const onClickButton = () => {
    props.onSelectCustomerCallback(props.id - 1)
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td><Button onClick={onClickButton}>Select Customer</Button></td>
    </tr>
  )
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSelectCustomerCallback: PropTypes.func.isRequired,
};

export default Customer;