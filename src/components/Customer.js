import React, {Component} from 'react';

class Customer extends Component {
  constructor (props) {
    super(props);
  }

  onChangeHandler = (event) => {
    this.props.selectedCallback(this.props.customerId);
  }

  render () {
    return(
      <tr>
        <td>{this.props.customerId}</td>
        <td>{this.props.name}</td>
        <td>{this.props.numMoviesCheckedOut}</td>
        <td >${this.props.accountCredit}</td>
        <td><button type="button" className="btn btn-primary">Add</button></td>
      </tr>
    );
  }
}

export default Customer;