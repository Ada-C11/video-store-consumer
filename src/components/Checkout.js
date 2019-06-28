import React from 'react';
import './Checkout.css';
import axios from 'axios';

const Checkout = (props) => {
  const checkoutMovie = () => {
    const movieTitle = props.selectedMovie;
    const checkoutUrl = 'http://localhost:4000' + '/rentals/' + `${movieTitle}` + '/check-out';
    const queryParams = {
      'customer_id': props.selectedCustomerId, 
      'due_date': addDays(10),
    }

    axios.post(checkoutUrl, queryParams)
    .then((response) => {
      let successMessages = `Movie: ${movieTitle} was successfully checked out!`
      props.refreshList();
      props.displayMessages(successMessages);
    })
    .catch((error) => {
      const errorMessages = error.message || error.response
      props.displayMessages(errorMessages)
    })
  }

  const addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  const onCheckoutButtonClick = (event) => {
    event.preventDefault();
    checkoutMovie();
    props.clearSelectedCallback();
  }

  return(
    <div className="checkout-container">
      <h5 className="checkout-title">Current selections</h5>
      <div className="checkout-info">
        Customer: {props.selectedCustomerName}
      </div>
      <div className="checkout-info">
        Movie: {props.selectedMovie}
      </div>
      <div>
        <button 
          onClick={onCheckoutButtonClick}
          className="btn btn-info"
        >
          Check out
        </button>
      </div>
    </div>
  );
  
}

export default Checkout;