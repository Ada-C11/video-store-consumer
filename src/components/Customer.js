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
      <li onClick={this.onSelect}>{this.props.content["name"]}</li>
    );
  }
}

export default Customer;