import React, { Component } from "react";
import "./RentalCheckout.css";

class RentalCheckout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <div>{this.props.selectedMovie}</div>;
      </section>
    );
  }
}

export default RentalCheckout;
