import React, { Component } from 'react';
import axios from 'axios';
import Customer from './Customer';
import './CustomerList.css'

const URL_CUSTOMERS = 'http://localhost:4000/customers'
class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      allCustomers: [],
      errorMessage: [],
    }
  }

  componentDidMount = () => {
    const allCustomers = [];
    axios.get(URL_CUSTOMERS)
    .then((response) => {
      response.data.forEach((element) => {
        allCustomers.push(element);
      })
      this.setState({allCustomers, });
    })
    .catch((error) => {
      this.props.displayMessages(error.message)
    })
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
        <h3 className="customers-title">Customers</h3>
        {this.displayCustomers()}
      </section>
    )
  }
}

export default CustomerList;