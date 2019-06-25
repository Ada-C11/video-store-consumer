import React, {Component} from 'react';

const Customer = (props) => {
  return(
    <section>
      {props.name}
      <button>Add Customer</button>
    </section>
  );
}

export default Customer;