import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Customer from './Customer';

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    }
  }

  componentDidMount() {
    const customerURL = this.props.url + 'customers/';

    axios.get(customerURL)
      .then((response) => {
        const customerList = response.data.map((customer) => {

          return {
            id: customer.id,
            name: customer.name,
            registeredAt: customer.registered_at,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zip: customer.postal_code,
            phone: customer.phone,
            accountCredit: customer.account_credit,
            moviesCheckedOutCount: customer.movies_checked_out_count,
          }
        });
        console.log(customerList);
        this.setState({
          customers: customerList,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  selectACustomer = (index) => {
    const selectedCustomer = this.state.customers[index];

    this.props.selectCustomerCallback(selectedCustomer);
  }

  generateCustomers = () => {
    return this.state.customers.map((customer, i) => {
      return (
        <Customer
          key={i}
          index={i}
          name={customer.name}
          id={customer.id}
          registeredAt={customer.registeredAt}
          address={customer.address}
          city={customer.city}
          state={customer.state}
          zip={customer.zip}
          phone={customer.phone}
          accountCredit={customer.accountCredit}
          moviesCheckedOutCount={customer.moviesCheckedOutCount}
          selectACustomerCallback={this.selectACustomer}
        />
      )
    });
  };

  render() {
    return (
      <div>
        <h3>Customer List</h3>
        <table className="table" >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Movie Count</th>
              <th>Select Customer</th>
            </tr>
          </thead>
          <tbody>

            {this.generateCustomers()}

          </tbody>
        </table>
      </div>
    )
  }
}

CustomerList.propTypes = {
  url: PropTypes.string
}

export default CustomerList;