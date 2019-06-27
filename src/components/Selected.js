import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Accordion} from 'react-bootstrap'
import axios from 'axios';
import moment from 'moment';

import listErrors from '../listErrors.js';
import './Selected.css';
class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true,
        };
    }

    toggleCollapse = () => {
        this.setState(
            { 
                opened: !this.state.opened,
            });
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
                    this.props.addNotificationCallback(
                        {
                            toastTitle: "Success!",
                            toastMessage:`Successfully rented ${this.props.movie.title} to ${this.props.customer.name}. Your movie is due on ${moment(response.data.due_date).format('MMM do, YYYY')}.`,
                            toastTimestamp:Date.now(),
                            error: false,
                          }
                    );
                    this.props.clearSelectionCallback();
                })
                .catch((error)=>{
                    let errorList = null;
                    if (error.response && error.response.data && error.response.data.errors) {
                        errorList = listErrors(error.response.data.errors);
                    }
                    this.props.addNotificationCallback (
                        {
                            toastTitle: "Error!",
                            toastMessage:`Could not create rental: ${ error.message}.`,
                            errorList: errorList,
                            toastTimestamp:Date.now(),
                            error: true,
                          }
                    );
                    ;
                })
        } else {
                    this.props.addNotificationCallback (
                        {
                            toastTitle: "Error!",
                            toastMessage:`You must select both a customer and a movie to create a rental.`,
                            toastTimestamp:Date.now(),
                            error: true,
                          }
                    );
        }
       
    }
    render() {
        return (
            <div className="selections">
                <Accordion>
                    <Card style={{ width: '18rem' }} >
                            <Accordion.Toggle as={Card.Header}eventKey="0">
                            Your Selections
                            </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Card.Title>Customer:</Card.Title>
                                <Card.Text>
                                    {this.props.customer ? this.props.customer.name: "No Customer Selected"}
                                </Card.Text>
                                <Card.Title>Movie:</Card.Title>
                                <Card.Text>
                                    {this.props.movie ? this.props.movie.title: "No Movie Selected"}
                                </Card.Text>
                                <Button onClick={ this.onReserveButtonClick } variant='primary'>
                                Reserve Movie
                            </Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

Selected.propTypes = {
    addNotificationCallback: PropTypes.func,
    clearSelectionCallback: PropTypes.func,
}

export default Selected;