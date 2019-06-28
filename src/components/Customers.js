import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
import Table from 'react-bootstrap/Table'
import './Customers.css';

const Customers = (props) => {

  const findRentalsCallback = (customerID) => {
    const rentals = []
    for (let key in props.allRentals) {
      if (props.allRentals[key]["customer"] === customerID) {
        rentals.push(
          {
            "movie": props.allRentals[key]["movie"],
            "checkout_date": props.allRentals[key]["checkout_date"],
            "due_date": props.allRentals[key]["due_date"]
          }
        )
      }
    }
    return rentals
  }


  const customerCollection = props.customers.map((customer, i) => {
    return <Customer key={i} 
                    customer={customer} 
                    viewCustomerRental={props.expandedCustomers[customer.id]} 
                    findRentalsCallback={findRentalsCallback} 
                    onSelectCustomerCallback={props.onSelectCustomerCallback} 
                    chosenCustomer={props.chosenCustomer}
                    onDeselectCustomerCallback={props.onDeselectCustomerCallback}
                    onCustomerRentalsCallback={props.onCustomerRentalsCallback}/>
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