import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Customer extends Component {
  render() {
  const { index, name, id, registeredAt, address, city, state, zip, phone, accountCredit, moviesCheckedOutCount, selectACustomerCallback } = this.props;

  return (
    <section className="card-body">
      <p>Customer ID: { id }</p>
      <h3>{ name }</h3>
      <button
        value={id}
        onClick={ () => { selectACustomerCallback(index) } }
      >Select</button>
    </section>
  )};
}

Customer.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.number,
  registeredAt: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  phone: PropTypes.string,
  accountCredit: PropTypes.number,
  moviesCheckedOutCount: PropTypes.number,
  selectACustomerCallback: PropTypes.func
}

export default Customer; 