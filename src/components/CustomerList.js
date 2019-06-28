import React from 'react';
import axios from 'axios';
import Customer from './Customer';
import './CustomerList.css'

const CustomerList = (props) => {
  const updateSelected = (customerId) => {
    props.allCustomers.forEach((customer) => {
      if(customer.id === parseInt(customerId, 10)) {
        props.selectedCustomer(customer.name, customer.id);
      }
    })
  }

  const displayCustomers = () => {
    const displayedCustomers = props.allCustomers.map((customer) => {
      return(
        <Customer
          key={customer.id}
          customerId={customer.id}
          name={customer.name}
          numMoviesCheckedOut={customer.movies_checked_out_count}
          accountCredit={customer.account_credit}
          selectedCallback={updateSelected}
        />
      )
    })
    return(
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Movies Checked Out Count</th>
            <th scope="col">Account Credit</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {displayedCustomers}
        </tbody>
      </table>
    );
  }

  return (
    <section>
      <h3 className="customers-title">All Customers</h3>
      {displayCustomers()}
    </section>
  );
}

export default CustomerList;