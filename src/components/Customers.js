import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
import Table from 'react-bootstrap/Table'

// import axios from 'axios';
// import './Customers.css';

const Customers = (props) => {
  const customerCollection = props.customers.map((customer, i) => {
    return <Customer key={i} id={customer.id} name={customer.name} onSelectCustomerCallback={props.onSelectCustomerCallback}/>
   });

  return (
    <section>
      <h2>Customers</h2>
      <Table>
        <thead>
          <tr>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>{customerCollection}</tbody>
      </Table>
    </section>
  )
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelectCustomerCallback: PropTypes.func.isRequired,
};

export default Customers;