import React from 'react'
import PropTypes from 'prop-types';
import './Customers.css';
import Customer from './Customer';

const Customers = (props) => {
  const displayCustomers = props.customerList.map((customer, i) => {
    return <Customer
              key = {i}
              id = {customer.id}
              name = {customer.name}
              onCustomerSelect = {props.onCustomerSelect}
            />
    })
    return (
      <section className="customers-page">
        <h2>Customers</h2>
        { displayCustomers }
      </section>
    )
}

Customers.propTypes ={
  customerList: PropTypes.array,
  currentCustomer: PropTypes.object,
  onCustomerSelect: PropTypes.func,
}


export default Customers;
