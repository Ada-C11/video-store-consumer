import React from 'react';

const Customer = (props) => {
  const onClickHandler = () => {
    props.selectedCallback(props.customerId);
  }

  return(
    <tr>
      <td>{props.customerId}</td>
      <td>{props.name}</td>
      <td>{props.numMoviesCheckedOut}</td>
      <td >${props.accountCredit}</td>
      <td><button type="button" className="btn btn-primary" onClick={onClickHandler}>Add</button></td>
    </tr>
  );
}

export default Customer;