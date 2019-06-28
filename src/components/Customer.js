import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Customer.css';


class Customer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    }
  }

  componentDidMount() {
    const fullUrl = "http://localhost:3000/customers"
    axios.get(fullUrl)
      .then((response) => {
        const customers = response.data.map((customer) => {
          const { id, name, city, address, postal_code, phone, account_credit, movies_checked_out_count } = customer;
          const newCustomer = {
            id: id,
            name: name,
            city: city,
            address: address,
            postal_code: postal_code,
            phone: phone,
            account_credit: account_credit,
            movies_checked_out_count: movies_checked_out_count,
          }
          return newCustomer;
        })

        this.setState({ customers });

      })
      .catch((error) => {
        this.setState({ errorMessages: error.message });
      });
  }


  render() {
    const displayCustomers = this.state.customers.map((customer) => {
      const { id, name, city, address, postal_code, phone, account_credit, movies_checked_out_count } = customer;
      return (
        <div key={id} className="card" >
          <ul className="card_data-ul">
            <li className=""><strong>{id}. {name}</strong></li>
            <li className="card_data-li">{address}, {city} {postal_code}</li>
            <li className="card_data-li">{phone}</li>
            <li className="card_data-li"><strong>Account credit:</strong> ${account_credit}</li>
            <li className="card_data-li"><strong>Movies checked out:</strong> {movies_checked_out_count}</li>
            <button className="select_customer_button" onClick={this.props.currentCustomerCallback(customer)}>Select this Customer</button>
          </ul>
        </div>
      )
    })
    return (
      <div className="content_container">
        <h1 className="green_text">Customers</h1>
        <section className="card_container" >
          {displayCustomers}
        </section>
      </div>
    )

  }
}

Customer.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  registered_at: PropTypes.instanceOf(Date),
  address: PropTypes.string,
  city: PropTypes.string,
  postal_code: PropTypes.number,
  phone: PropTypes.string,
  account_credit: PropTypes.number,
  movies_checked_out_count: PropTypes.number,
}


export default Customer;