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
    axios.get(`http://localhost:3001/customers`)
      .then((response) => {
        const customers = response.data.map((customer) => {

       return(
         <p key= {customer.id}>{customer.name}</p>
       )
        })
        console.log(response.data)
        this.setState({
          customers: customers,
        });
      })
      .catch((error) => {
        console.log(error);
        alert('Error happened');
        this.setState({ error: error.message });
      });
  }

  render() {
    const customers = this.state.customers.map(customer => {
      return (
        <section key={customer}>
          <span> {customer} </span>

          <button
            type="button"
            className="btn btn-danger"
            aria-label="Close"
            onClick={() => this.selectToCheckoutCustomer(customer)}
          >
            SELECT
          </button>
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
