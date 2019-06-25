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
            selected: ""
        }
    }

    selectCustomer = (customer) => {
        this.setState({
            selected: customer,
        });
    }

    componentDidMount() {
        const endpoint = 'http://localhost:3000/customers'

        axios.get(endpoint)
        .then((response) => {
            const customerList = response.data.map((customer) => {
                return(
                < Customer 
                    key= {customer.id}
                    id= {customer.id}
                    name = {customer.name}
                    city= {customer.city}
                    state= {customer.state}
                    phone= {customer.phone}
                    accountCredit= {customer.account_credit}
                    moviesCheckedOutCount={customer.movies}
                    selectCustomerCallback={this.selectCustomer}
                    />
                );
            });
            this.setState({
                customers: customerList,
            });
        })
        .catch((error)=>{

        })   
    }

    render() {
        return (
            <div className="customer-list">
            {this.state.customers}
            </div>
            
        );
    }
}

export default CustomerList;