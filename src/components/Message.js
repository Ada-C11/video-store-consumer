import React from 'react'
import PropTypes from 'prop-types';

const Message = (props) => {

  return (
    <div>
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