import React, { Component } from 'react';


class Customer extends Component {
  constructor() {
    super();
  }

  onSelect = () => {
    this.props.selectCustomerCallBack(this.props.content)
  }


  render() {
    return (
      <li><a href="#" className="text-light" onClick={this.onSelect}>{this.props.content["name"]}</a>
      <p><button className="btn press" onClick={this.onSelect}>
      Select Customer
    </button></p>
      </li>
    );
  }
}

export default Customer;