import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'
import './Customer.css'

class Customer extends Component {
    
    onSelectButtonClick = () =>{
        this.props.selectCustomerCallback(this.props);
    }

    render() {
        const {name, city, stateName, phone, accountCredit, moviesCheckedOutCount} = this.props;
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{city}, {stateName} </Card.Text>
                <Card.Text>{phone}</Card.Text>
                <Card.Text>${accountCredit} account credit</Card.Text>
                <Card.Text className="card-text">{moviesCheckedOutCount} movies currently checked out </Card.Text>
                <Button onClick={ this.onSelectButtonClick}  variant="primary">
                    Select
                </Button>
            </Card.Body>
          </Card>
        )
    }
    
}

export default Customer;