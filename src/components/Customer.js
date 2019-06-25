import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import './CustomerList.css';


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
        <div key={id} className="customer">
          {id}
          <button onClick={this.props.currentCustomerCallback(customer)}>{name}</button>
          {city}
          {address}
          {postal_code}
          {phone}
          {account_credit}
          {movies_checked_out_count}
        </div>
      )
    })
    return (

      <section className="customer_list" >
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