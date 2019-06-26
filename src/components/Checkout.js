import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
    }
  }
  
  checkoutMovie = () => {
    const movieTitle = this.props.selectedMovie;
    const checkoutUrl = 'http://localhost:4000' + '/rentals/' + `${movieTitle}` + '/check-out';
    const queryParams = {
      'customer_id': this.props.selectedCustomerId, 
      'due_date': this.addDays(10),
    }

    axios.post(checkoutUrl, queryParams)
    .then((response) => {
      const successMessages = this.state.successMessages;
      successMessages.push(`Movie: ${movieTitle} was successfully checked out!`)
      this.setState({
        successMessages,
      })
      setTimeout(() => {this.setState({successMessages: []})}, 3000);
    })
    .catch((error) => {
      const errorMessages = this.state.errorMessages;
      errorMessages.push(`Status code: ${error.response.status}. ${error.response.statusText}`);
      this.setState({
        errorMessages,
      })
      setTimeout(() => {this.setState({errorMessages: []})}, 3000);
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
    this.props.clearSelectedCallback();
  }

  displaySuccessMessages = () => {
    const messages = this.state.successMessages.map((message, i) => {
      return(
        <li key={i}>{message}</li>
      );
    })
    return messages;
  }

  displayErrorMessages = () => {
    const messages = this.state.errorMessages.map((message, i) => {
      return(
        <li key={i}>{message}</li>
      );
    })
    return messages;
  }

  render() {
    return(
      <div className="checkout-container">
        <ul className="message-container">
          {this.displaySuccessMessages()}
          {this.displayErrorMessages()}
        </ul>
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