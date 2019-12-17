import React, { Component } from 'react';
import Customer from './Customer';
import PropTypes from 'prop-types';
import './CustomerCollection.css';


class CustomerCollection extends Component {
  render() {
      const customerComponents = this.props.customers.map((customer, i) => {
        return (
            <div className="Customer-Card" key={i}>
                <Customer 
                customer={customer}
                onSelectCustomerCallback={this.props.onSelectCustomerCallback}
                /> 
            </div>
        )
    });

    return (
        <section>
          <ul >
            {customerComponents}
          </ul>
        </section>
      );
  }
}

CustomerCollection.propTypes = {

};

export default CustomerCollection;