import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  console.log(props);
  const { name, id, registeredAt, address, city, state, zip, phone, accountCredit, moviesCheckedOutCount } = props;

  return (
    <section>
      <h3>{ name }</h3>
      <ul>
        <li>{ id }</li>
        <li> this will be more things!</li>
      </ul>
    </section>
  )
}

export default Customer; 