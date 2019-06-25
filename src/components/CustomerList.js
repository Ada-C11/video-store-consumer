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
      // console.log(response.data);
      response.data.forEach((element) => {
        allCustomers.push(element);
      })
      this.setState({allCustomers, });
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
      if(customer.id === customerId) {
        console.log('anything here?');
        console.log(customer.name);
        this.setState({
          selectedCustomer: customer.name,
        })
      }
    })
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
            isSelected = {this.state.selectedCustomer}
          />
        </div>
      )
    })
    return (
      <form>
        { displayedCustomers }
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