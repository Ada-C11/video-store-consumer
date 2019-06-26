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
    console.log(this.props)
    const displayCustomers = this.state.customers.map((customer) => {
      const { id, name, city, address, postal_code, phone, account_credit, movies_checked_out_count } = customer;
      return (
        <article key={id} className="card" >
          <ul className="list-group list-group-flush">
            <li className="list-group-item name">{id}: {name}</li>
            <li className="list-group-item"><strong>Address:</strong> {address}, {city} {postal_code}</li>
            <li className="list-group-item"><strong>Phone Number: </strong>{phone}</li>
            <li className="list-group-item"><strong>Account credit:</strong> ${account_credit}</li>
            <li className="list-group-item"><strong>Movies checked out:</strong> {movies_checked_out_count}</li>
            <button className="select_customer_button" onClick={this.props.currentCustomerCallback(customer)}>Select this Customer</button>
          </ul>
        </article>
      )
    })
    return (

      <section className="row" >
        {displayCustomers}
      </section>
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