import React, { Component } from 'react';
import Customer from './Customer'
class Customers extends Component {

  render() {
    const allCustomers = this.props.customers.map((customer, i) => {
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
        </header>
        <ul className="customer-list">{allCustomers}</ul>
      </div>
    );
  }
}

export default Customers;