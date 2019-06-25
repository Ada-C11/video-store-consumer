import React, { Component } from "react";
import "./RentalCheckout.css";

class RentalCheckout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header className="App__header">
          <h2>
            {this.props.selectedMovie}
            {this.props.selectedCustomer}
          </h2>
          ;
        </header>
      </div>
    );
  }
}

export default RentalCheckout;
