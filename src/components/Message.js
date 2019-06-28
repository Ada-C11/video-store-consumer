import React from 'react'
import PropTypes from 'prop-types';
import './Message.css'

const Message = (props) => {

  return (
    <div className="message">
      {props.message && 
        <p>{props.message}</p>
      }
    </div>
    
    )
}
export default Message

Message.propTypes = {
    message: PropTypes.string,
}