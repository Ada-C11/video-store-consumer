import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {

  const onClickCustomer = () => {
    props.getCustomerNameCallback(props.name, props.id)
  }


  return (
    <div className="customer">
        <div className="content">
          <div>{props.name}</div>
          <div>{props.address}</div>
          <div>{props.city}, {props.state}</div>
          <div>{props.postal}</div>

          <div>{props.phone}</div>
          <div>${props.account_credit} account credit</div>
        </div>
      {/* <button onClick={onClickCustomer}
        className="customer__select">
        Select for rental
      </button> */}
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
  created_at:PropTypes.instanceOf(Date),
  getCustomerNameCallback:PropTypes.func,
};

export default Customer;
