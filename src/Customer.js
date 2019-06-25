import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import customerItem from './customerItem'



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
                    
                    return <customerItem
                        key={customer.id}
                        title={customer.name}
                        onSelectcustomerCallback = {this.props.onSelectcustomerCallback}
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
    onSelectcustomerCallback: PropTypes.func.isRequired,
};

export default Customer;
