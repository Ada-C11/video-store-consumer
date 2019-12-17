import React, { Component } from 'react';
import PropTypes from 'prop-types';
import card from '../images/blockbusterCard.jpg';

import './Customer.css';

class Customer extends Component {


  render() {
    return (

      <div className="customer__section">
             <h2 className="customer_name">{this.props.customer.name}</h2>
        
        <div className="card_text">
          <img className="customer_icon" src={card} alt="customer card"/>
 
          
          <div class="middle">
            <p>movies checked out: {this.props.customer.movies_checked_out_count}</p>
            <p>account credit: {this.props.customer.account_credit}</p>
            <p>registered at: {this.props.customer.registered_at}</p>
            <p>address: {this.props.customer.address}  {this.props.customer.city}, {this.props.customer.state} {this.props.customer.postal_code}</p>
          </div>
        </div>
          <button 
            onClick = {() => this.props.onSelectCustomerCallback(this.props.customer.id) }>
            Select Customer
        </button>
      </div>
    )
  }
}

Customer.propTypes = {

};

export default Customer;