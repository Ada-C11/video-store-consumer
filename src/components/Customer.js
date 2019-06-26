import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const {id, name, registered_at, address, 
    city, state, postal_code, 
    phone, account_credit, movies_checked_out_count,
    onSelectHandler} = props;

  const onCustomerClick = () => {
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
        <button className="btn btn-primary" onClick={onCustomerClick} >
          Select
        </button>
      </td>
    </tr>
      
  );
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  registered_at: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal_code: PropTypes.string,
  phone: PropTypes.string,
  account_credit: PropTypes.number,
  movies_checked_out_count: PropTypes.number
};

export default Customer;