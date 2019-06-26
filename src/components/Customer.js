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
      <li><a href="#"onClick={this.onSelect}>{this.props.content["name"]}</a></li>
    );
  }
}

export default Customer;