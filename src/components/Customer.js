import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const displayClickableCustomer = (props.onCustomerSelect === undefined) ? <h3>{props.name}</h3> : <h3 onClick={() => props.onCustomerSelect(props.id)}>{props.name}</h3>

  return (
    <section>
      <p> { props.id }. { displayClickableCustomer } </p>
    </section>
  )
}


Customer.propTypes ={
  id: PropTypes.number,
  name: PropTypes.string,
  onCustomerSelect: PropTypes.func,
}

export default Customer;