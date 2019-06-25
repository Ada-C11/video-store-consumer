import React, {Component} from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Customer.css'

class Customer extends Component {
    
    onSelectButtonClick = () =>{
        this.props.selectCustomerCallback(this.props);
    }

    render() {
        const {name, city, stateName, phone, accountCredit, moviesCheckedOutCount} = this.props;
        return (
            <div className="card" style={{width: 18 + 'rem'}}>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{city}, {stateName}</p>
              <p className="card-text">{phone}</p>
              <p className="card-text">${accountCredit} account credit</p>
              <p className="card-text">{moviesCheckedOutCount} movies currently checked out</p>
              <button onClick={ this.onSelectButtonClick}
                className="btn btn-primary select-movie-btn"
              >Select</button>
            </div>
          </div>
        )
    }
    
}

export default Customer;