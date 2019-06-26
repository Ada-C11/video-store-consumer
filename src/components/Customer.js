import React from 'react';

function Customer (props) {
  const onCustomerClick = () => {
    props.addCustomertoRentCallback(props.customer)
  }
  return <p onClick={onCustomerClick}>{props.customer.name}</p>
}

export default Customer;