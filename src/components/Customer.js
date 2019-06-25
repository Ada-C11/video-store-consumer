import React from 'react';
import { Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Customer = (props) => {
  const {id, name, registered_at, address, 
    city, state, postal_code, 
    phone, account_credit, movies_checked_out_count,
    onSelectHandler} = props;

  const onSelectClick = () => {
    onSelectHandler(id);
  }
    
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
        <button className="btn btn-primary" onClick={onSelectClick} >
          Select
        </button>
      </td>
    </tr>
      
  );
}

export default Customer;