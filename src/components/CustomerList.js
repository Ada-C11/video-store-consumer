import React, { Component } from 'react';
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
      this.setState( {customerList: response.data})
      this.props.getCustomerCallback(this.state.customerList);
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      });
    });
  }

  selectCustomerCallback = (id) => {
    this.props.selectCustomerCallback(id);
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
        selectedCustomerCallback={this.selectCustomerCallback}
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
  selectCustomerCallback: PropTypes.func,
}

export default CustomerList;


