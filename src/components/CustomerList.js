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
        <section key={i}>
          <p className="card w-75">
            <p className="card-body">
              <h5 className="card-title">Name: {customer.name}</h5>
              <p>ID: {customer.id}</p>
              <span>
                # of Movies checked out: {customer.movies_checked_out_count}
              </span>
              <p>Account credit: ${customer.account_credit.toFixed(2)}</p>
              <p>Contact: {customer.phone}</p>

              <br />
              <button
                type="button"
                className="btn btn-danger"
                aria-label="Close"
                onClick={() => this.selectToCheckoutCustomer(customer)}
              >
                SELECT CUSTOMER
              </button>
            </p>
          </p>
        </section>
      );
    });
    return (
      <React.Fragment>
        <h2> List of Customers</h2>
        <section className="customer-layout">{customers} </section>
      </React.Fragment>
    );
  }
}

export default CustomerList;
