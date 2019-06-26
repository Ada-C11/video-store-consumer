import React from 'react';

const Checkout = (props) => {
  return(
    <div>
      <div>
        Selected Customer: {props.selectedCustomerName}
      </div>
      <div>
        Movie: {props.selectedMovie}
      </div>
    </div>
  );
}

export default Checkout;