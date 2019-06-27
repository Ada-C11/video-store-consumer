import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customer extends Component {
  render() {
    const displayClickableCustomer = (this.props.onCustomerSelect === undefined) ? <h3>{this.props.name}</h3> : <h3 onClick={() => this.props.onCustomerSelect(this.props.id)}>{this.props.name}</h3>

    return (
      <section>
        <p> { this.props.id }. { displayClickableCustomer } </p>
      </section>
    )
  }
}

Customer.propTypes ={
  id: PropTypes.number,
  name: PropTypes.string,
  onCustomerSelect: PropTypes.func,
}

export default Customer;