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
                <Card.Body>
                    <Card.Title>Your Selections</Card.Title>
                    <Card.Text>Customer: {this.props.customer ? this.props.customer.name: "No Customer Selected"}</Card.Text>
                    <Card.Text>Movie: {this.props.movie ? this.props.movie.title: "No Movie Selected"}</Card.Text>
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