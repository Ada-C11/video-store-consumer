import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './Rental.css';

const Rental = (props) => {
  // const rentMovie = () => {



    // const checkoutDate = new Date();
    // const dueDate = new Date();
    // dueDate.setDate(dueDate.getDate() + 7 );
  
    // const checkoutDateFormatted = `${checkoutDate.getFullYear()}/${checkoutDate.getMonth() + 1}/${checkoutDate.getDate()}`;
    // const dueDateFormatted = `${dueDate.getFullYear()}/${dueDate.getMonth() + 1}/${dueDate.getDate()}`;

    // const url = `http://localhost:3001/rentals/${props.movie.title}/check-out`;

    // const params = {
    //   due_date: props.dueDate,
    //   customer_id: props.customer.id,
    // }
  
    // axios.post(url, params)
    // .then((response)=> {
    //   console.log(response.data)
    //   const movie = props.movie.title
    //   const customer = props.customer.name

    //   props.onRentCallback()
    //   return `Rented! "${movie}" checked out by ${customer}`
    // })
    // .catch((error) => {
    //     this.setState({
    //         error: error.message
    //     })
    // });
  // }



  // console.log(checkoutDate);
  // console.log(checkoutDateFormatted);
  // console.log(dueDate);
  // console.log(dueDateFormatted);

    // const rental = () => {
    // const url = `http://localhost:3001/rentals/${props.movie.title}/check-out`;

    // const params = {
    //   due_date: props.dueDate,
    //   customer_id: props.customer.id,
    // }
  
    // axios.post(url, params)
    // .then((response)=> {
    //   console.log(response.data)
    //   const movie = props.movie.title
    //   const customer = props.customer.name

    //   props.onRentCallback()
    //   return `Rented! "${movie}" checked out by ${customer}`
    // })
    // .catch((error) => {
    //     this.setState({
    //         error: error.message
    //     })
    // })}


  return (
    // axios.post(url, params)
    // .then((response)=> {
    //   console.log(response.data)
    //   const movie = props.movie.title
    //   const customer = props.customer.name

    //   props.onRentCallback()
    //   return `Rented! "${movie}" checked out by ${customer}`
    // })
    // .catch((error) => {
    //     this.setState({
    //         error: error.message
    //     })
    // })

    // {rental()}
    `Rented! "${props.movie.title}" checked out by Customer #${props.customer.id}`

    // <div>
    //   Hello
    //   <p>{props.customer.id} </p>
    //   <p>{props.movie} </p>
    //   <p>{props.dueDate} </p>
    // </div>
  )
}

Rental.propTypes = {
  // movie: PropTypes.object.isRequired,
  // customer: PropTypes.object.isRequired,
  // checkoutDate: PropTypes.string.isRequired,
  // dueDate: PropTypes.string.isRequired,
};

export default Rental;