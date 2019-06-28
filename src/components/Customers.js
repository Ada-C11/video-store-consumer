import React from 'react'
// import axios from 'axios';
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
      <div>{ displayCustomers }</div>
    )
}



export default Customers;
