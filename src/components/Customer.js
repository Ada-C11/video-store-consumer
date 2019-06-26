import React from 'react';
import PropTypes from 'prop-types';


const Customer = (props) => {

    const onSelectClick = (event) => {
        props.selectCustomerCallback(props.name);
    }

    return (
            <section>
              <div>{props.name}</div>
              {<button id={props.id} onClick={onSelectClick}>Select Customer</button>}
            </section>
    );
}

export default Customer;

Customer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    selectCustomerCallback: PropTypes.func,
}