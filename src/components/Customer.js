import React from 'react';
import './Customer.css'

const Customer = (props) => {
  const onClickHandler = () => {
    props.selectedCallback(props.customerId);
  }

  return(
    <tr className="customer-row">
      <td>{props.customerId}</td>
      <td>{props.name}</td>
      <td>{props.numMoviesCheckedOut}</td>
      <td >${props.accountCredit}</td>
      <td><button type="button" className="btn btn-primary" onClick={onClickHandler}>Add</button></td>
    </tr>
  );
}

export default Customer;