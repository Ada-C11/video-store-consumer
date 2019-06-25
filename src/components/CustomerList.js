import React from 'react';
import PropTypes from 'prop-types';

const CustomerList = (props) => {

  const {customerList} = props

  const displayCustomers = customerList.map((customer, i) => {
    return (
      <p>{customer.name}</p>
      )
  })

  return (
    <section>
      <p>Customer List</p>
      { displayCustomers }
    </section>
  );
}

CustomerList.propTypes = {
  customerList: PropTypes.array,
};


export default CustomerList;