import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Customer.css'
class Customer extends Component {

    onClickButton = () => {
        this.props.onSelectCustomerCallback(this.props);
    }

    render() {
        const { id, name, movies_checked_out_count } = this.props;

        return (
            <tbody>
                <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{movies_checked_out_count}</td>
                    <td><button
                        className="btn btn-primary"
                        onClick={this.onClickButton}
                    >Select Customer
                </button></td>
                </tr>
            </tbody>
        )
    }
}

Customer.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    movies_checked_out_count: PropTypes.number
};


export default Customer;