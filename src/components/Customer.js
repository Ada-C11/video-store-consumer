import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CustomerItem from './CustomerItem'



const CUSTOMER_URL = 'http://localhost:3001/customers'


class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
        };

    }

    componentDidMount() {
        axios.get(CUSTOMER_URL)
            .then((response) => {
                const customersList = response.data.map((customer) => {
                    
                    return <CustomerItem
                        key={customer.id}
                        id = {customer.id}
                        name={customer.name}
                        onSelectCustomerCallback = {this.props.onSelectCustomerCallback}
                    />
                });
                this.setState({ customers: customersList });
            })
            .catch((error) => {
                console.log(error);
            })
          }


    render() {
        return (
            <div>
                <div className='customer-item-container'>
                    {this.state.customers}
                </div>

            </div>
        )
    }

}

Customer.propTypes = {
    onSelectCustomerCallback: PropTypes.func.isRequired,
};

export default Customer;
