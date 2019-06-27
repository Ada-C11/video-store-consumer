import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Customer from './Customer'


import './CustomerList.css'

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selected: undefined
        }
    }

    getCustomers() {
        const endpoint = 'http://localhost:3000/customers'

        axios.get(endpoint)
        .then((response) => {
            const customerList = response.data.map((customer) => {
                return (
                < Customer 
                    key= {customer.id}
                    id= {customer.id}
                    name = {customer.name}
                    city= {customer.city}
                    stateName= {customer.state}
                    phone= {customer.phone}
                    accountCredit= {customer.account_credit}
                    moviesCheckedOutCount={customer.movies_checked_out_count}
                    selectCustomerCallback={this.props.selectCustomer}
                    />
                );
            });
            this.setState({
                customers: customerList,
            });
        })
        .catch((error)=>{
            this.props.addNotificationCallback(
                {
                    toastTitle: "Error!",
                    toastMessage:`Could not retrieve customers: ${error.message}`,
                    toastTimestamp:Date.now(),
                    error: true,
                    dismissNotification:this.props.dismissNotificationCallback 
                }
             
              )
        });   
    }
    componentDidMount() {
        this.getCustomers();
    }
    componentDidUpdate() {
        this.getCustomers();
    }

    render() {
        const customerList = this.state.customers;
        return (
            <div className="customer-list">
                {customerList}
            </div>
            
        );
    }
}
CustomerList.propTypes = {
    selectCustomer: PropTypes.func,
    addNotificationCallback: PropTypes.func,
}

export default CustomerList;