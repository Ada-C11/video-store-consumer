import React from 'react';
import PropTypes from 'prop-types';
import './StatusBar.css';

const StatusBar = (props) => {
  const disableCheckoutButton = ((props.currentCustomer && props.currentMovie)) ? false : true

  return(
    <section className="status-bar">
      <div className="feedback-message">
        {props.feedbackMessage}
      </div>
      <div className="checkout-customer">
        Checking out for customer: <span className="selected-customer">{props.currentCustomer.name}</span>
      </div>
      <div>
        Checking out title: <span className="selected-title">{props.currentMovie.title}</span>
      </div>
      <button 
        onClick={props.onRentalCheckout}
        disabled={disableCheckoutButton}
        className="checkout-button"
        >
        Checkout
      </button>
    </section>
  )
}

StatusBar.propTypes = {
  currentCustomer: PropTypes.object,
  currentMovie: PropTypes.object,
  feedbackMessage: PropTypes.string
};

export default StatusBar;