import React, {Component} from 'react';

class Customer extends Component {
  constructor (props) {
    super(props);
  }

  onChangeHandler = (event) => {
    this.props.selectedCallback(event.target.value);
  }

  render () {
    return(
      <label>
        <input
          type="radio" 
          value={this.props.customerId} 
          onChange={this.onChangeHandler}
          checked={this.props.isSelected ===  this.props.name} 
        />
        {this.props.name}
      </label>
    );
  }
}

export default Customer;