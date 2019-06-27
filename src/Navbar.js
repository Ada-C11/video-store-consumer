import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-nav nav-fill justify-content-between" id="navbarSupportedContent">
                    <div className="nav-item">
                        <Link to="/customers" className="nav-link btn btn-outline-primary">customers<span class="sr-only">(current)</span></Link>
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
                    <div className="nav-item">
                        <Link to="/customers" className="nav-link btn btn-outline-primary">check out<span class="sr-only">(current)</span></Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar