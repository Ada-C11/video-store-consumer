import React, { Component } from "react";
import "./RentalCheckout.css";

class RentalCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: {},
      checkoutStatus: false
    };
  }

  checkout = (movie, customer) => {
    this.setState({
      checkout: { customer: customer, movie: movie },
      checkoutStatus: true
    });
  };

  render() {
    let checkoutText = "";

    if (this.state.checkoutStatus === true) {
      checkoutText = `${
        this.state.checkout.customer
      } has check out the following movie: ${this.state.checkout.movie.title}`;
    }

    const checkoutRental =
      this.props.selectedCustomer && this.props.selectedMovie ? (
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
      ) : null;

    return (
      <div>
        <header className="App__header">
          <h2>
            {this.props.selectedMovie
              ? this.props.selectedMovie.title
              : "Please select Movie to checkout"}
            {this.props.selectedCustomer}
          </h2>
        </header>
        {checkoutRental}
        <p> {checkoutText}</p>
      </div>
    );
  }
}

export default RentalCheckout;
