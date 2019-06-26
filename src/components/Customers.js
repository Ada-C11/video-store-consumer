import React, { Component } from 'react';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';

import Customer from './Customer'

class Customers extends Component {
  constructor() {
    super();
    
    this.state = {
      customerList: [],
    };
  }

  generateCustomerList = () => {
    return this.state.customerList.map((customer) => {
      return (<Customer 
        key={customer.id}
        customer={customer}
        addCustomertoRentCallback = {this.props.addCustomerToRentCallback}
      />)
    })
  }

  componentDidMount() { 
    axios.get("http://localhost:3090/customers") 
    .then((response)=>{
    const customerList = response.data.map((customer) => {
      return customer
    })
    console.log(customerList)
    this.setState({customerList})
  })
}

  render () {
    return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th scope="col">Account Credit</th>
          </tr>
        </thead>
        <tbody>
          {this.generateCustomerList()}
        </tbody>
      </table>
    </div>
  );
}
}

export default Customers;