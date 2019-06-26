import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Customer from './Customer'
import PropTypes from 'prop-types'

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
      this.setState( {customerList: response.data})
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
      });
    });

  }

  render() {
    const customers = this.state.customerList.map((customer) => {
      return <Customer
        key={customer.id}
        id={customer.id}
        name={customer.name}
        address={customer.address}
        city={customer.city}
        state={customer.state}
        postal_code={customer.phone}
        account_credit={customer.account_credit}
        getCustomerNameCallback={this.props.getCustomerNameCallback}
      />
    });
    
    return (
      <div>
        {customers}
      </div>
    )
  }


}

CustomerList.propTypes = {
  getCustomerNameCallback:PropTypes.func,
}

export default CustomerList;


