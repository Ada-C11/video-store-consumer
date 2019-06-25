import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Customer extends Component {
  // onSelect = (event) => {
  //   event.preventDefault();
  
  //   const selected = event.target.value;
  //   console.log(selected);

  //   this.props.customerSelectCallback(selected);
  // }

  render() {
  // console.log(this.props);
  // console.log(this.props.selectACustomerCallback);
  const { index, name, id, registeredAt, address, city, state, zip, phone, accountCredit, moviesCheckedOutCount, selectACustomerCallback } = this.props;

  return (
    <section>
      <h3>{ name }</h3>
      <ul>
        <li>{ id }</li>
        <li> this will be more things!</li>
      </ul>
      <button
        value={id}
        onClick={ () => { selectACustomerCallback(index) } }
      >Select</button>

    </section>
  )};
}

export default Customer; 