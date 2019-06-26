import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Customer.css';

function Customer (props) {
  const onCustomerClick = () => {
    props.addCustomertoRentCallback(props.customer)
  }
  return (
      <tr onClick={onCustomerClick}>
        <td scope="row">{props.customer.id}</td>
        <td>{props.customer.name}</td>
        <td>{props.customer.address}<br/>
            {props.customer.city}, {props.customer.state} {props.customer.postal_code}</td>
        <td>{props.customer.phone}</td>
        <td>{props.customer.account_credit}</td>
      </tr>
  )
}

export default Customer;