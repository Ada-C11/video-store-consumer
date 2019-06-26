import React, { Component } from 'react';
import propTypes from 'prop-types';
import './ErrorMessage.css'

const ErrorMessage = (props) => {
  let hidden = "hidden";
  return (
    <div className={hidden}>
      <div className="alert-warning error-message">Error Message!</div>
    </div>
  )
}

export default ErrorMessage;