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
      .get(`http://localhost:3000/customers`)
      .then(response => {
        const customers = response.data.map(customer => {
          return customer;
        });
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
          <div className="card w-75">
            <div className="card-body">
              <h5 className="card-title">Name: {customer.name}</h5>
              <p className="card-text">ID: {customer.id}</p>
              <p className="card-text">
                # of Movies checked out: {customer.movies_checked_out_count}
              </p>
              <p className="card-text">Phone number: {customer.phone}</p>

              <br />
              <button
                type="button"
                className="btn btn-danger"
                aria-label="Close"
                onClick={() => this.selectToCheckoutCustomer(customer.name)}
              >
                SELECT
              </button>
            </div>
          </div>
        </section>
      );
    });
    return (
      <div>
        <h2> List of Customers</h2> {customers}
      </div>
    );
  }
}

export default CustomerList;
