import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import './Rental.css';

const Rental = (props) => {
  return (
    <div>
      {props.customer}, {props.movie}, {props.dueDate}
    </div>
  )
}

Rental.propTypes = {
  movie: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  checkoutDate: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
};

export default Rental;