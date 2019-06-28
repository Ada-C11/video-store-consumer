import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const displayClickableCustomer = (props.onCustomerSelect === undefined) ? <h3>{props.name}</h3> : <h3 onClick={() => props.onCustomerSelect(props.id)}>{props.name}</h3>

  return (
    <table className="customers-table">
      <tr>
        <td className="customers-table-id">{ props.id }</td>
        <td className="customers-table-name">{ displayClickableCustomer }</td>
      </tr>
    </table>
  )
}


Customer.propTypes ={
  id: PropTypes.number,
  name: PropTypes.string,
  onCustomerSelect: PropTypes.func,
}

export default Customer;