import React from 'react';
import propTypes from 'prop-types';

import './SelectBar.css'

const SelectBar = (props) => {
  const { selectedMovie, selectedCustomer, checkoutCallback } = props;

  return (
    <div className="select-bar">
      <ul>
        <li>
          Selected Movie:
        </li>
        <li>
          {selectedMovie && selectedMovie.title}
        </li>
        <li>
          Selected Customer: 
        </li>
        <li>
          {selectedCustomer && selectedCustomer.name}
        </li>
        <li>
          <button
            type="button"
            onClick={() => { checkoutCallback() }}
          >Checkout Rental</button>
        </li>
      </ul>
    </div>
  )
}

SelectBar.propTypes = {
  selectedMovie: propTypes.object,
  selectedCustomer: propTypes.object,
}

export default SelectBar;