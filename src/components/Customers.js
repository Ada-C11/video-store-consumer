import React, { Component } from 'react';
import axios from 'axios';
import Customer from './Customer'
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    this.updateCustomers()
  }

  updateCustomers = () => {
    const url = `http://localhost:3000/customers`
    axios.get(url)
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }


  render() {
    console.log(this.props.selectCustomerCallBack)
    const allCustomers = this.state.customers.map((customer, i) => {
      return <Customer
                key={i}
                content={customer}
                selectCustomerCallBack={this.props.selectCustomerCallBack}
      />
    })
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Customers</h1>
         {allCustomers}
        </header>
      </div>
    );
  }
}

export default Customers;