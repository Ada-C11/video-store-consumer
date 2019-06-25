import React, { Component } from "react";
import "./CustomerList.css";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: ["Adam", "Alex", "Victor", "Walter"],
      selectedCustomer: ""
    };
  }

  selectToCheckoutCustomer = customer => {
    this.setState({
      selectedCustomer: customer
    });

    this.props.rentMovieWithCustomerCallback(customer);
  };

  render() {
    if (this.state.selected) {
      return <div>{this.state.selectedCustomer}</div>;
    } else {
      const customers = this.state.customers.map(customer => {
        return (
          <section>
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
}

export default CustomerList;
