import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
  constructor (props) {
    super(props);
  }
  
  checkoutMovie = () => {
    const checkoutUrl = 'http://localhost:4000' + '/rentals/' + `${this.props.selectedMovie}` + '/check-out';
    const queryParams = {
      'customer_id': this.props.selectedCustomerId, 
      'due_date': this.addDays(10),
    }
    axios.post(checkoutUrl, queryParams)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  onCheckoutButtonClick = (event) => {
    event.preventDefault();
    this.checkoutMovie();
  }

  render() {
    return(
      <div className="checkout-container">
        <div>
          Selected Customer: {this.props.selectedCustomerName}
        </div>
        <div>
          Selected Movie: {this.props.selectedMovie}
        </div>
        <div>
          <button 
            onClick={this.onCheckoutButtonClick}
            className="btn btn-primary"
          >
            Check out
          </button>
        </div>
      </div>
    );
  }
}

export default Checkout;