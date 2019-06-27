import React, { Component } from 'react';
import propTypes from 'prop-types';
import './ErrorMessage.css'

const ErrorMessage = (props) => {
  let errorMessageStyle = "error-message alert-dismissible " + props.errorStyle;
  let hidden = "hidden";
  if (props.message) {
    hidden = ''
  }
  console.log(props.addErrorMessageCallback)
  return (
    <div className={hidden}>

      <div className={errorMessageStyle}>
        <button onClick={() => { props.addErrorMessageCallback('') }} href="#" className="close" data-dismiss="alert" aria-label="close">&times;</button>
        {props.message}</div>

    </div >
  )
}

export default ErrorMessage;