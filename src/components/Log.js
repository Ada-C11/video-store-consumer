import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import './Log.css';

const Log = (props) => {
  const overdueMoviesCall = () => {
    axios.get('http://localhost:3001/rentals/overdue')
    .then((response) => {
      const overdueMovieCollection = response.data.map((overdueMovie) => {
        return <li>{overdueMovie.title}</li>
      })
      props.setOverdueMoviesCallback(overdueMovieCollection)
    })
    .catch((error) => {
      props.setErrorOverdueCallback(error)
    });
  }
  // let uniqueRentals = {}

  // const showAllRentals = () => {
  //   axios.get('http://localhost:3001/rentals')
  //   .then((response) => {
  //     console.log("succcess")
  //     console.log(response.data)
  //     // let uniqueRentals = {}
  //     response.data.forEach((rental) => {
  //       if (rental) {
  //         uniqueRentals[rental.title] = {
  //           "customer": rental.customer,
  //           "checkout_date": rental.checkout_date,
  //           "due_date": rental.due_date
  //         }
  //       }
  //     })
  //     props.setAllRentals(rentalCollection)
  //   })
  //   .catch((error) => {
  //     props.setAllRentalsError(error)
  //   });
  // }

  // const rentalCollection = Object.keys(uniqueRentals).map((key, i) => {
  //   return <li key={i}>{key} checked out by Customer #{uniqueRentals[key]["customer_id"]} on {uniqueRentals[key]["checkout_date"]} due {uniqueRentals[key]["due_date"]} </li>
  // })

  return (
    <div>
      <button onClick={overdueMoviesCall}>Overdue Movies</button>
      {props.overdueMovies && <ul>{props.overdueMovies.length > 0 ? props.overdueMovies : "No Movies are Overdue!" }</ul>}

      {/* <button onClick={showAllRentals}>All Rentals</button> */}
      {/* {props.allRentals && <ul>{props.allRentals.length > 0 ? rentalCollection : "No Current Rentals!" }</ul>} */}
    </div>
  )
}

Log.propTypes = {
  setOverdueMoviesCallback: PropTypes.func.isRequired,
  overdueMovies: PropTypes.array,
};

export default Log;