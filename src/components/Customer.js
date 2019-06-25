import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
    return (
            <div>{props.name}</div>
    );
}

export default Customer;

Customer.propTypes = {
    name: PropTypes.string,
}