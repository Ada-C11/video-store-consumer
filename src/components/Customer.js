import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Customer extends Component {
  render() {
    const {id, name, registered_at, address, 
      city, state, postal_code, phone, 
      account_credit, movies_checked_out_count} = this.props;
    return (
      
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{registered_at}</td>
        <td>{address}</td>
        <td>{city}</td>
        <td>{state}</td>
        <td>{postal_code}</td>
        <td>{phone}</td>
        <td>{account_credit}</td>
        <td>{movies_checked_out_count}</td>
        <td> 
          <button className="btn btn-primary" >
            Select
          </button>
        </td>
      </tr>
        
    );
  }
}
export default Customer;