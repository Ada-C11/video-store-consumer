import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomerItem extends Component {

    constructor(props) {
        super(props);
        const { name, onSelectCustomerCallback } = this.props;
    }

    render() {
        const { name, onSelectCustomerCallback } = this.props;
        return (
            <div className='customer-item'>
                <h3 className='customer-name'> {name} </h3>
                
                <button className="select-customer-button" onClick={() => {onSelectCustomerCallback(this.props)}}>Select customer</button>
            </div >
        )
    };
}


export default CustomerItem