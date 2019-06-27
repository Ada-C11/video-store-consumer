import React from 'react';
import PropTypes from 'prop-types';

const CustomerList = (props) => {

  const {customerList} = props

  const displayCustomers = customerList.map((customer, i) => {
    return (
      <p key={i}>{customer.name}
        <button onClick={() => {props.selectCustomer(customer)}}>
          Select Customer
        </button>
      </p>
    )
  })

  return (
    <section>
      <p>Customers:</p>
      { displayCustomers }
    </section>
  );
}

CustomerList.propTypes = {
  customerList: PropTypes.array,
  selectCustomer: PropTypes.func.isRequired,
};


export default CustomerList;