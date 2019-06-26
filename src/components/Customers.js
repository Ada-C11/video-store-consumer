import React, { Component } from 'react';
import axios from 'axios'

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
      <h2>{this.generateCustomerList()}</h2>
    </div>
  );
}
}

export default Customers;