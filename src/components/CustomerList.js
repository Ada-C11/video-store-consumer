import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './CustomersList.css';
import Customer from './Customer';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomer: undefined
        }
    }
    
    customerCards() {
        axios.get('http://localhost:3000/customers')
        .then((response) => {
            const allCustomers = response.data.map((customer) => {
                return (
                    < Customer
                        key={customer.id}
                        id= {customer.id}
                        registered_at={customer.registered_at}
                        name={customer.name}
                        address={customer.address}
                        city={customer.city}
                        state={customer.state}
                        postal_code={customer.postal_code}
                        phone={customer.phone}
                        account_credit={customer.account_credit}
                        movies_checked_out_count={customer.movies_checked_out_count}
                        onSelectCustomerCallback={this.props.onSelectCustomer}
                    />
                );
            });
            this.setState({
                customers: allCustomers,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
    componentDidMount() {
        this.customerCards();
    }

    render () {
        const allCustomers = this.state.customers;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Movies Checked Out</th>
                        <th scope="col">Select</th>
                    </tr>
                </thead>
                {allCustomers}
            </table>
        );
    }
}

CustomerList.propTypes = {
    onSelectCustomer: PropTypes.func,
  };

export default CustomerList;