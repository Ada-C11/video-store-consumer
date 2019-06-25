import React, {Component} from 'react';

class Customer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedCustomer: undefined,
    }
  }

  onChangeHandler = (event) => {
    console.log('anything changing?');
    console.log(event.target.value);
    this.setState({
      selectedCustomer: event.target.value,
    })
  }

  render() {
    return(
      <label>
        <input 
          type="radio" 
          value={this.props.name} 
          onChange={this.onChangeHandler} 
          checked={this.state.selectedCustomer === this.props.name} 
        />
        {this.props.name}
      </label>
    );
  }
}

export default Customer;