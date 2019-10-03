import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Header.css'

function Header(props) {

  return (
    <nav className="navbar sticky-top navbar-lg" >
      <ul className="nav navbar-nav">
        {/* <li className="nav-item">
          <Link to="/">Home</Link>
        </li> */}
        <li className="nav-item">
          <Link to="/search">Search</Link>
        </li>
        <li className="nav-item">
          <Link to="/library">Library</Link>
        </li>

        <li className="nav-item">
          <Link to="/customers">Customers</Link>
        </li>
      </ul>
      <div className="rental-container">
          <h5 className="rental-header">Rental Information</h5>
          <p className="rental-body">Movie: {props.movieTitle}</p>
          <p className="rental-body">Customer: {props.customerName}</p>
      </div>
        <div className='button-container'>
          <button className={`btn btn-light ${props.checkoutButtonClassName}`}
            onClick={props.onCheckoutClickCallback}>
          Checkout!
        </button>
      </div>
    </nav>
  );
}

export default Header;