import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
// import './Customer.css';

const Customer = (props) => {
  const onSelectCustomer = () => {
    props.onSelectCustomerCallback(props.id - 1)
  }

  const onViewRentals = () => {
    props.onCustomerRentalsCallback(props.id)
  }

  const showCustomerRentals = () => {
    const rentalHTML = props.customerRentals.map((rental, i) => {
      return <tr key={i}><td>{rental["movie"]}</td><td>{rental["checkout_date"]}</td><td>{rental["due_date"]}</td></tr>
    })

    return rentalHTML
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td><Button onClick={onSelectCustomer}>Select Customer</Button></td>
      <td><Button onClick={onViewRentals}>Rentals</Button></td>
      {props.customerRentals && <table><tr><th>Movie</th><th>Checked Out</th><th>Due On</th></tr>{showCustomerRentals()}</table>}


    </tr>
  )
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  allRentals: PropTypes.array,
  onSelectCustomerCallback: PropTypes.func.isRequired,
  onCustomerRentalsCallback: PropTypes.func.isRequired,
};

export default Customer;