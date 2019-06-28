import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
import Table from 'react-bootstrap/Table'
import './Customers.css';

const Customers = (props) => {
  const customerCollection = props.customers.map((customer, i) => {
    return <Customer key={i} customer={customer} viewCustomerRental={props.expandedCustomers[customer.id]} customerRentals={props.customerRentals} onSelectCustomerCallback={props.onSelectCustomerCallback} onCustomerRentalsCallback={props.onCustomerRentalsCallback}/>
   });

  return (
    <section className="customers_container">
      <h1>Customers</h1>
      <Table striped size="sm">
        <tbody>{customerCollection}</tbody>
      </Table>
    </section>
  )
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  expandedCustomer: PropTypes.object,
  onSelectCustomerCallback: PropTypes.func.isRequired,
  onCustomerRentalsCallback: PropTypes.func.isRequired,
};

export default Customers;