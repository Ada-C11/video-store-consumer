import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'

import './Selected.css'
class Selected extends Component {
    onReserveButtonClick = () =>{
        console.log('reserve me!');
    }
    render() {
        return (
            <div className="selections">
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