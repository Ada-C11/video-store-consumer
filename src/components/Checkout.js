import React from 'react';

const Checkout = (props) => {
  return(
    <div>
      <div>
        Selected Customer: {props.selectedCustomer ? props.selectedCustomer.name : ''}
      </div>
      <div>
        Movie
      </div>
    </div>
  );
}

export default Checkout;