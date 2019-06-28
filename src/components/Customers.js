import React from 'react'
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



export default Customers;
