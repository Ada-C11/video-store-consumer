import React from 'react';
import propTypes from 'prop-types';

import './SelectBar.css'

const showClearButton = (selection, callback) => {
  if (selection) {
    console.log(selection);
    return(
      <div className="selection">
        { selection.title ? selection.title : selection.name }
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
  const { selectedMovie, selectedCustomer, checkoutCallback, clearSelectionCallback } = props;
  

  return (
    <div className="select-bar">
      <ul>
        <li>
          Selected Movie:
        </li>
        <li>
          { showClearButton(selectedMovie, clearSelectionCallback) }
        </li>
        <li>
          Selected Customer: 
        </li>
        <li>
          { showClearButton(selectedCustomer, clearSelectionCallback) }
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