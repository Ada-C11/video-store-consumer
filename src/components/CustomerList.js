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

    selectCustomer = (customer) => {
        this.setState({
            selected: customer,
        });
        console.log(this.state.selected);
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
                    selectCustomerCallback={this.selectCustomer}
                    />
                );
            });
            this.setState({
                customers: customerList,
            });
        })
        .catch((error)=>{

        });   
    }
    componentDidMount() {
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

export default CustomerList;