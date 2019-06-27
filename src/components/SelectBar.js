import React from 'react';
import propTypes from 'prop-types';

import './SelectBar.css'

const showClearButton = (selection, callback) => {
  if (selection) {
    console.log(selection);
    return(
      <div>
        { selection.title }
        <button 
          onClick={ () => { callback(selection) } } 
          href="#" 
          className="close select-button" 
          aria-label="close"
        >
          &times;
        </button>
      </div>
    )
  } else {
    return "---"
  }
}

const SelectBar = (props) => {
  const { selectedMovie, selectedCustomer, checkoutCallback } = props;
  

  return (
    <div className="select-bar">
      <ul>
        <li>
          Selected Movie:
        </li>
        <li>
          { showClearButton(selectedMovie, checkoutCallback) }
        </li>
        <li>
          Selected Customer: 
        </li>
        <li>
          { showClearButton(selectedCustomer, checkoutCallback) }
        </li>
        <li>
          <button
            className="select-button"
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