import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    onCreateRental = ()=>{
        axios.post('http://localhost:3000/rentals/:title/check-out',{
            customer : this.props.customer,
            movie: this.props.customer,
            due_date : new Date()
        })
        .then(function(response){
                alert("Your rental algo was successful!!.");
        }).catch(function(error){
            alert("Sorry an error ocurred, please try again.");
        });
    }

    render() {
        if(this.props.movie!="none" && this.props.customer!="none"){
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-nav nav-fill justify-content-between" id="navbarSupportedContent">
                        <div className="nav-item">
                            <Link to="/customers" className="nav-link btn btn-outline-primary">customers<span className="sr-only">(current)</span></Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/" className="nav-link btn btn-outline-primary">rental library</Link>
                        </div>
                        <div className="nav-item">
                            <SearchForm />
                        </div>
                        <div className="nav-item">
                            <div>current customer: {this.props.customer}</div>
                        </div>
                        <div className="nav-item">
                            <div>current movie: {this.props.movie}</div>
                        </div>
                        <div>
                            <button className="nav-link btn btn-outline-primary" onClick={this.onCreateRental} />
                        </div>
                    </div>
                </nav>
            )
        }
        else{
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbar-nav nav-fill justify-content-between" id="navbarSupportedContent">
                        <div className="nav-item">
                            <Link to="/customers" className="nav-link btn btn-outline-primary">customers<span className="sr-only">(current)</span></Link>
                        </div>
                        <div className="nav-item">
                            <Link to="/" className="nav-link btn btn-outline-primary">rental library</Link>
                        </div>
                        <div className="nav-item">
                            <SearchForm />
                        </div>
                        <div className="nav-item">
                            <div>current customer: {this.props.customer}</div>
                        </div>
                        <div className="nav-item">
                            <div>current movie: {this.props.movie}</div>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

export default Navbar