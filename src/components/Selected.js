import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Toast} from 'react-bootstrap'
import axios from 'axios';
import moment from 'moment';
import Moment from 'react-moment';

import './Selected.css'
class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            toastTitle: '',
            toastMessage: '',
            toastTimestamp:'',
            error:true
        }
    }
    onReserveButtonClick = () =>{
        if (this.props.movie && this.props.customer) {
            const endpoint = `http://localhost:3000/rentals/${this.props.movie.title}/check-out`;
            const params = {
                customer_id: this.props.customer.id,
                due_date: moment().add(14, 'days').calendar(),
            }
            axios.post(endpoint, params)
                .then((response)=>{
                    console.log(response);
                    this.setState({
                        showToast: true,
                        toastTitle: "Success!",
                        toastMessage: `Successfully rented ${this.props.movie.title} to ${this.props.customer.name}. Your movie is due on ${response.data.due_date} `,
                        toastTimestamp: Date.now(),
                        error: false
                    });
                })
                .catch((error)=>{
                    this.setState({
                        showToast: true,
                        toastTitle: "Error",
                        toastMessage: `Could not create rental: ${error.message}`,
                        toastTimestamp: Date.now()
                    });
                })
        } else {
            this.setState({
                showToast: true,
                toastTitle: "Error",
                toastMessage: "You must select both a customer and a movie to create a rental." ,
                toastTimestamp: Date.now()
            });
        }
       
    }
    render() {
        const {error, showToast, toastTitle, toastMessage, toastTimestamp} = this.state;
        const toggleShowToast = () => this.setState({ showToast: !showToast });
        return (
            <div className="selections">
                <Toast className={error ? 'error' : 'success'}show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <strong className="mr-auto">{toastTitle}</strong>
                        <small>
                            <Moment fromNow>{toastTimestamp}</Moment>
                        </small>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
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