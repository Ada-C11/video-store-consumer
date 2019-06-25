import React, {Component} from 'react';

class Customer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedOption: '',
    }
  }

  onChangeHandler = (event) => {
    console.log(event.target.value);
    this.props.selectedCallback(this.props.customerId);
    this.setState({
      selectedOption: this.props.name,
    })
  }

  render () {
    return(
      <label>
        <input 
          type="radio" 
          value={this.props.customerId} 
          onChange={this.onChangeHandler}
          checked={this.props.isSelected ===  this.selectedOption} 
        />
        {this.props.name}
      </label>
    );
  }
}

export default Customer;