import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';
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
    return <div key={i}><Customer  
                    customer={customer} 
                    viewCustomerRental={props.expandedCustomers[customer.id]} 
                    findRentalsCallback={findRentalsCallback} 
                    onSelectCustomerCallback={props.onSelectCustomerCallback} 
                    chosenCustomer={props.chosenCustomer}
                    onDeselectCustomerCallback={props.onDeselectCustomerCallback}
                    onCustomerRentalsCallback={props.onCustomerRentalsCallback}/></div>
   });

  return (
    <body>
      <section id="communityHeader"><b>- Our <i>Community</i> -</b></section>
      <section className="customers_container">
        {customerCollection}
      </section>
    </body>
  )
}

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  expandedCustomer: PropTypes.object,
  onSelectCustomerCallback: PropTypes.func.isRequired,
  onCustomerRentalsCallback: PropTypes.func.isRequired,
};

export default Customers;