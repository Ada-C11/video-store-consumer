import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './CustomerList.css';


class Customer extends Component {

  render() {
    return (
      <div className="customer">
        <div className="customer__content">
          {this.props.id}
          {this.props.name}
          {this.props.city}
          {this.props.address}
          {this.props.postal_code}
          {this.props.phone}
          {this.props.account_credit}
          {this.props.movies_checked_out_count}
        </div>
      </div>
    )
  }
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registered_at: PropTypes.instanceOf(Date),
  address: PropTypes.string,
  city: PropTypes.string,
  postal_code: PropTypes.number,
  phone: PropTypes.string,
  account_credit: PropTypes.number,
  movies_checked_out_count: PropTypes.number,
}


export default Customer;