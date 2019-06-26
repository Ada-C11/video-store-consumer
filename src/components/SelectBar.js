import React from 'react';
import propTypes from 'prop-types';

const SelectBar = (props) => {
  const { selectedMovie, selectedCustomer, checkoutCallback } = props;

  return (
    <div>
      <ul>
        <li>
          Selected Movie: {selectedMovie && selectedMovie.title}
        </li>
        <li>
          Selected Customer: {selectedCustomer && selectedCustomer.name}
        </li>
        <li>
          <button
            type="button"
            onClick={() => { checkoutCallback() }}
          >Checkout Rental</button>
        </li>
      </ul>
    </div >
  )
}

SelectBar.propTypes = {
  selectedMovie: propTypes.object,
  selectedCustomer: propTypes.object,
}

export default SelectBar;