import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Customer extends Component {
  render() {
    const { index, name, id, registeredAt, address, city, state, zip, phone, accountCredit, moviesCheckedOutCount, selectACustomerCallback } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{`${address}, ${city}, ${state}, ${zip}`}</td>
        <td>{phone}</td>
        <td>{moviesCheckedOutCount}</td>
        <td>
          <button
            className="button btn"
            value={id}
            onClick={() => { selectACustomerCallback(index) }}
          >
            Select
          </button>
        </td>


      </tr>
    )
  };

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