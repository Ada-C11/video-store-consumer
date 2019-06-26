import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import './Rental.css';

const Rental = (props) => {
  // const rentMovie = () => {
  //   const title = props.movie.title
  //   axios.post(`http://localhost:3001/rentals/${title}/check-out`)
  //   .then((response)=> {
  //       if (response.status === 200) {
  //           this.setState({
  //               success: `Rented! "${props.movie.title}" checked out by ${props.chosenCustomer.name} `
  //           })
  //       }
  //   })
  //   .catch((error) => {
  //       this.setState({
  //           error: error.message
  //       })
  //   });
  // }
  return (
    <div>
      {/* <button onClick={rentMovie}>Rent Movie</button> */}
      {props.customer}
      {props.movie}
      {props.dueDate}
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