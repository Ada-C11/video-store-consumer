import React from 'react';
import PropTypes from 'prop-types';

const StatusBar = (props) => {
  const disableCheckoutButton = ((props.currentCustomer && props.currentMovie)) ? false : true

  return(
    <section>
      <div>
        {props.feedbackMessage}
      </div>
      <div>
        Checking out for customer: {props.currentCustomer.name}
      </div>
      <div>
        Checking out title: {props.currentMovie.title}
      </div>
      <button 
        onClick={props.onRentalCheckout}
        disabled={disableCheckoutButton}
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