import React from 'react';
import PropTypes from 'prop-types';


const Customer = (props) => {

    const onSelectClick = (event) => {
        console.log("I've been selected!");
        console.log(event.target.id);
    }

    return (
            <section>
              {props.name}
              {<button id={props.id} onClick={onSelectClick}>Select</button>}
            </section>
    );
}

export default Customer;

Customer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
}