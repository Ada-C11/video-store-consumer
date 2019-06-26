import React from 'react';
import propTypes from 'prop-types';

const SelectBar = (props) => {
  const { selectedMovie, selectedCustomer, checkoutCallback } = props;

  return (
    <div>
      Selected Movie: { selectedMovie && selectedMovie.title }
      Selected Customer: { selectedCustomer && selectedCustomer.name }
      <button
        type="button"
        onClick={ () => { checkoutCallback()} }
      >Checkout Rental</button>
    </div>
  )
}

SelectBar.propTypes = {
  selectedMovie: propTypes.object,
  selectedCustomer: propTypes.object,
}

export default SelectBar;