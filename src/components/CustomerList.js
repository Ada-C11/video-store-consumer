import React, { Component } from 'react';
import Customer from './Customer';

class CustomerList extends Component {
  constructor() {
    super();
  }

  updateSelected = (customerId) => {
    this.props.allCustomers.forEach((customer) => {
      if(customer.id === parseInt(customerId, 10)) {
        this.props.selectedCustomer(customer.name, customer.id);
      }
    })
  }

  displayCustomers = () => {
    const displayedCustomers = this.props.allCustomers.map((customer) => {
      return(
        <Customer
          key={customer.id}
          customerId={customer.id}
          name={customer.name}
          numMoviesCheckedOut={customer.movies_checked_out_count}
          accountCredit={customer.account_credit}
          selectedCallback={this.updateSelected}
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

  render() {
    return(
      <section>
        <h3>All Customers</h3>
        {this.displayCustomers()}
      </section>
    )
  }
}

export default CustomerList;