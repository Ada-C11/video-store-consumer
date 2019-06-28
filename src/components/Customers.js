import React, { Component } from 'react';
import './Customers.css';
import axios from 'axios';
import PropTypes from 'prop-types';

class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayCustomerList: true
        }

    }

    componentDidMount() {
        console.log('what is this.props', this.props);
      
        axios.get('http://localhost:3000/customers')
            .then((response) => {

                console.log('customer response.data', response.data);

                this.props.setAllCustomersCallback(response.data);
            })
    }

    // onClickListCustomers = (props) => {
    //     this.setState({
    //         displayCustomerList: true
    //     })
    // }

    render() {
        const {displayCustomerList} = this.state;
        const {customers} = this.props;

        const mappedCustomers = customers.map((customer, i) => {
            return (
                <tr key={i} onClick={this.props.selectCustomerCallback(customer)} >
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                </tr>
            )
        });
        return (
            <div>
                {displayCustomerList && <table className="customers-table">
                    <tr>
                        <th>Id #</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                    </tr>
                    {mappedCustomers}
                </table>}
                {/* <button type='button' onClick={this.onClickListCustomers}>List all Customers</button> */}
            </div >
        );
    }
}

Customers.propTypes = {
    setAllCustomersCallback: PropTypes.func.isRequired,
    selectCustomerCallback: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};
export default Customers;