import React, { Component } from 'react'
// import axios from 'axios';
import Customer from './Customer';

class Customers extends Component {
  render() {
    const displayCustomers = this.props.customerList.map((customer, i) => {
      return <Customer
                key = {i}
                id = {customer.id}
                name = {customer.name}
                onCustomerSelect = {this.props.onCustomerSelect}
              />
      })
      return (
        <div>{ displayCustomers }</div>
      )
  }
  
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     customerList: [],
  //     currentCustomer: undefined,
  //   }
  // }

  // customers_url = "https://enigmatic-chamber-40825.herokuapp.com/customers"

  // componentDidMount() {
  //   axios.get(this.customers_url)
  //   .then((response) => {
  //     console.log(response.data);

  //     const customerList = response.data.map((customer) => {
  //       const newCustomer = {
  //         id: customer.id,
  //         name: customer.name,
  //       }
  //       return newCustomer;
  //     })

  //     console.log(customerList);

  //     this.setState({ customerList });
  //   })
  //   .catch((error) => {
  //     this.setState({ error: error.message })
  //   })
  // }

//   onCustomerSelect = (customerID) => {
//     const currentCustomer = this.state.customerList.filter(customer => customer.id === customerID)[0]

//     console.log(currentCustomer)
//     this.setState({ currentCustomer });
//   };

//   render() {
//     const displayCustomers = this.state.customerList.map((customer, i) => {
//       return <Customer
//                 key = {i}
//                 id = {customer.id}
//                 name = {customer.name}
//                 onCustomerSelect = {this.onCustomerSelect}
//                 />
//     })

//     const displayCurrCustomer = (this.state.currentCustomer === undefined) ? "None" : this.state.currentCustomer.name
    
//     return (
//       <div>
//         Currently selected customer: { displayCurrCustomer }
//         { displayCustomers }
//       </div>
//     )
//   }
}

export default Customers;
