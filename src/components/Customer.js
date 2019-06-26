import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const selectCustomer = () => {
    return props.selectCustomerCallback(props.id)
  }

  return (
    <div className="customer">
        <div className="content">
          <ul>{props.name}</ul>
            <li>{props.address}</li>
            <li>{props.city}, {props.state}</li>
            <div>{props.postal}</div>

            <li>{props.phone}</li>
            <li>${props.account_credit} account credit</li>
            <li><a href="#" onClick={selectCustomer}>Select Customer</a></li>
        </div>
    </div>

  )
}

Customer.propTypes = {
  id:PropTypes.number,
  name:PropTypes.string,
  address:PropTypes.string,
  city:PropTypes.string,
  state:PropTypes.string,
  postal:PropTypes.string,
  phone:PropTypes.string,
  account_credit:PropTypes.number,
  selectCustomerCallback: PropTypes.func,
};

export default Customer;
