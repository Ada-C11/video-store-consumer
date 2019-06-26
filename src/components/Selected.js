import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Toast} from 'react-bootstrap'
import axios from 'axios';

import './Selected.css'
class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            toastTitle: '',
            toastMessage: '',
        }
    }
    onReserveButtonClick = () =>{
        if (this.props.movie && this.props.customer) {
            const endpoint = `http://localhost:3000/movies/${this.props.movie.title}/check-out`;
           
            return null;
        } else {
            this.setState({
                showToast: true,
                toastTitle: "Error",
                toastMessage: "You must select both a customer and a movie to create a rental." 
            });
        }
       
    }
    render() {
        const {showToast} = this.state;
        const toggleShowToast = () => this.setState({ showToast: !showToast });
        return (
            <div className="selections">
                <Toast show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <strong className="mr-auto">{this.state.toastTitle}</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>{this.state.toastMessage}</Toast.Body>
                </Toast>
                <Card style={{ width: '18rem' }}>
                <Card.Header as="h5">Your Selections</Card.Header>
                <Card.Body>
                    <Card.Title>Customer:</Card.Title>
                    <Card.Text>{this.props.customer ? this.props.customer.name: "No Customer Selected"}</Card.Text>
                    <Card.Title>Movie:</Card.Title>
                    <Card.Text>{this.props.movie ? this.props.movie.title: "No Movie Selected"}</Card.Text>
                </Card.Body>
                <Button onClick={ this.onReserveButtonClick }
              variant='primary'
            >Reserve Movie</Button>
            </Card>
            </div>
            
        )
    }
}

export default Selected;