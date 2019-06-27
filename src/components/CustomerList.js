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
        <table className="customer-grid" key={i}>
          <div> Id: {customer.id}</div>
          <div> Name: {customer.name}</div>
          <div> # of Rentals: {customer.movies_checked_out_count}</div>
          <div> Account Credit: ${customer.account_credit}</div>
          <div> Contact: {customer.phone}</div>{" "}
          <button
            type="button"
            className="block"
            aria-label="Close"
            onClick={() => this.selectToCheckoutCustomer(customer)}
          >
            SELECT CUSTOMER
          </button>
        </table>
      );
    });
    return (
      <React.Fragment>
        <h2> Customers</h2>
        <table className="customer-grid">{customers} </table>
      </React.Fragment>
    );
  }
}

export default CustomerList;
