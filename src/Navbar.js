import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    onCreateRental = ()=> {
        const dueDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    
        axios.post(`http://localhost:3000/rentals/${this.props.movie}/check-out`, {
            customer_id: this.props.customerId,
            title: this.props.movie,
            due_date: dueDate
        }) 
        .then((response) => {
            console.log("successfully rented film");
            alert("yay!")
          })
          .catch((error) => {
            console.log("could not rent film");
          });
    }
    
    render() {
        if(this.props.movie!="none" && this.props.customer!="none"){
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                    <div className="navbar-nav nav-fill justify-content-between" id="navbarSupportedContent">
                        <div className="nav-item px-5">
                            <Link to="/customers" className="nav-link btn btn-outline-primary">customers<span className="sr-only">(current)</span></Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/" className="nav-link btn btn-outline-primary">rental library</Link>
                        </div>
                        <div className="nav-item px-5">
                            <SearchForm />
                        </div>
                        {/* <div className="nav-item">
                            <div>current customer: {this.props.customer + "yo"}</div>
                        </div>
                        <div className="nav-item">
                            <div>current movie: {this.props.movie}</div>
                        </div> */}
                        <div>
                            <button className="nav-link btn btn-outline-primary px-5" onClick={this.onCreateRental}>Checkout</button>
                        </div>
                    </div>
                </nav>
           )
        }
        else{
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                    <div className="navbar-nav nav-fill justify-content-between" id="navbarSupportedContent">
                        <div className="nav-item px-5">
                            <Link to="/customers" className="nav-link btn btn-outline-primary">customers<span className="sr-only">(current)</span></Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/" className="nav-link btn btn-outline-primary">rental library</Link>
                        </div>
                        <div className="nav-item px-5">
                            <SearchForm />
                        </div>
                        {/* <div className="nav-item">
                            <div>current customer: {this.props.customer, this.props.customer}</div>
                        </div>
                        <div className="nav-item">
                            <div>current movie: {this.props.movie}</div>
                        </div> */}
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar