import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
    return (
            <section>
              {props.name}
              {<button >Select</button>}
            </section>
    );
}

export default Customer;

Customer.propTypes = {
    name: PropTypes.string,
}