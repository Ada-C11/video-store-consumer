import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./CustomerItem.css";

class CustomerItem extends Component {

    constructor(props) {
        super(props);
        const { name, onSelectCustomerCallback, id } = this.props;
    }

    render() {
        const { name, onSelectCustomerCallback } = this.props;
        return (
            <div className='customer-item'>
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png" className="customer-thumbnail" alt="customer image"></img>
                <h3 className='customer-name'> {name} </h3>
                
                <button className="select-customer-button" onClick={() => {onSelectCustomerCallback(this.props)}}>Select customer</button>
            </div >
        )
    };
}


export default CustomerItem