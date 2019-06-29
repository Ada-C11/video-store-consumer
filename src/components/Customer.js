import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Customer.css'

const Customer = (props) => {
  const selectCustomer = () => {
    return props.selectCustomerCallback(props.id)
  }

  return (
    <div>
        <div className="customer card">
            <div className="content card-body">
              <ul className="customer__info">
                <li className="card-title">{props.name}</li>
                  <li className="card-text">{props.address}</li>
                  <li className="card-text">{props.city}, {props.state}</li>
                  <li className="card-text money">${props.account_credit} account credit</li>
                  </ul>
                  <div className="select__button">
                    <button className="select__customer btn btn-dark"><a href="#" onClick={selectCustomer}>Select Customer</a></button>
                  </div>
            </div>
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
