import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
// import axios from 'axios';
// import './Customers.css';

const Customers = (props) => {
  const customerCollection = props.customers.map((customer, i) => {
    return <li key={i}><Customer id={customer.id} name={customer.name} onSelectCustomerCallback={props.onSelectCustomerCallback}/></li>
   });

  return (
    <div>
      <h2>Customers</h2>
      <ul>{customerCollection}</ul>
    </div>
  )
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelectCustomerCallback: PropTypes.func.isRequired,
};

export default Customers;