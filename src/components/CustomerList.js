import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Customer from './Customer'

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerList: [],
    }
  }


  componentDidMount() {
    axios.get('http://localhost:3000/customers')
    .then((response) => {
      console.log(response.data);
      this.setState( [{customerList: response.data}])
      // const customers = response.data.map(customer => {
      //   return <li>
      //             Name: {customer.name}
      //           </li>
      // });

      // this.setState( {customerList: customers})
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      })
    })

  }

  render() {
    return (
      <div>{this.state.customerList}</div>
    )
  }


}

export default CustomerList;


