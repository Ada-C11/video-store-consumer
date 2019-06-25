import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customer extends Component {
  render() {

    return (
      <section onClick = {() => this.props.onCustomerSelect(this.props.id)}>
        <h3> { this.props.id }. {this.props.name} </h3>
        {/* <p>
          Customer Name: {this.props.name }
        </p> */}
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