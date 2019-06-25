import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Customer extends Component {
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

  generateCustomers = () => {
    return this.state.customers.map((customer, i) => {
      return (
        <ul>
          <h3>{customer.name}</h3>
          <li>{customer.id}</li>
          <li></li>
        </ul>
      )
      });
  };

  render() {
    return(
      <div>
        <h3>This is a Customer List!</h3>
        { this.generateCustomers() }
      </div>
    )
  }
}

Customer.propTypes = {
  url: PropTypes.string,
}

export default Customer;