import React, { Component } from 'react';
import axios from 'axios';
import Customer from './Customer';

const URL_CUSTOMERS = 'http://localhost:4000/customers';

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      allCustomers: [],
      errorMessage: [],
      selectedCustomer: '',
    }
  }

  componentDidMount = () => {
    const allCustomers = [];
    axios.get(URL_CUSTOMERS)
    .then((response) => {
      response.data.forEach((element) => {
        allCustomers.push(element);
      })
      this.setState({allCustomers, });
      this.props.displayCustomerListCallBack();
    })
    .catch((error) => {
      const errorMessage = this.state.errorMessage;
      const newError = error.response.data.errors.text;
      newError.forEach((text) => {
        errorMessage.push(text);
      })
      this.setState({errorMessage, });
    })
  }

  updateSelected = (customerId) => {
    this.state.allCustomers.forEach((customer) => {
      if(customer.id === parseInt(customerId, 10)) {
        this.setState({
          selectedCustomer: customer.name,
        })
      }
    })
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    this.props.selectedCustomer(this.state.selectedCustomer);
  }

  displayCustomers = () => {
    const displayedCustomers = this.state.allCustomers.map((customer) => {
      return(
        <div>
          <Customer
            key={customer.id}
            customerId={customer.id}
            name={customer.name}
            selectedCallback={this.updateSelected}
            isSelected={this.state.selectedCustomer}
          />
        </div>
      )
    })
    return (
      <form>
        { displayedCustomers }
        <button onClick={this.onSaveButtonClick}>Save</button>
      </form>
    );
  }

  render() {
    return(
      <section>
        <h3>All Customers</h3>
        {this.displayCustomers()}
      </section>
    )
  }
}

export default CustomerList;