import React, { Component } from "react";
import "./RentalCheckout.css";

class RentalCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: [],
      checkoutStatus: false
    };
  }

  checkout = (movie, customer) => {
    this.setState({
      checkout: movie,
      checkoutStatus: true
    });
  };

  render() {
    let checkoutText = "";

    if (this.state.checkoutStatus === true) {
      checkoutText = "You are checked out";
    }
    console.log(checkoutText);

    return (
      <div>
        <header className="App__header">
          <h2>
            {this.props.selectedMovie}
            {this.props.selectedCustomer}
          </h2>
        </header>
        <button
          type="button"
          className="btn btn-danger"
          aria-label="Close"
          onClick={() =>
            this.checkout(this.props.selectedMovie, this.props.selectedCustomer)
          }
        >
          Checkout
        </button>
        <p> {checkoutText}</p>
      </div>
    );
  }
}

export default RentalCheckout;
