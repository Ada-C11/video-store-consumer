import React, { Component } from "react";
import axios from "axios";

import "./CustomerList.css";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      selectedCustomer: ""
    };
  }

  selectToCheckoutCustomer = customer => {
    this.setState({
      selectedCustomer: customer
    });

    this.props.rentMovieWithCustomerCallback(customer);
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3001/customers`)
      .then(response => {
        const customers = response.data;
        this.setState({
          customers: customers
        });
      })
      .catch(error => {
        console.log(error);
        alert("An error occurred");
        this.setState({ error: error.message });
      });
  }

  render() {
    const customers = this.state.customers.map((customer, i) => {
      return (
        <section className="customer-grid" key={i}>
          <span> Id: {customer.id}</span>
          <span> Name: {customer.name}</span>
          <span> # of Rentals: {customer.movies_checked_out_count}</span>
          <span> Account Credit: ${customer.account_credit}</span>
          <span> Contact: {customer.phone}</span>
            <button
              type="button"
              className="block"
              aria-label="Close"
              onClick={() => this.selectToCheckoutCustomer(customer)}
            >
              SELECT CUSTOMER
            </button>
        </section>
      );
    });
    return (
      <React.Fragment>
        <h2> Customers</h2>
        <section className="customer-grid">{customers} </section>
      </React.Fragment>
    );
  }
}

export default CustomerList;
