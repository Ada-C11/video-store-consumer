import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'
import './Customer.css'

const Customer = (props)=> {
        const onSelectButtonClick = () =>{
            props.selectCustomerCallback(props);
        }
        const {name, city, stateName, phone, accountCredit, moviesCheckedOutCount} = props;
        return (
            <Card className="customer-card">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{city}, {stateName} </Card.Text>
                <Card.Text>{phone}</Card.Text>
                <Card.Text>${accountCredit} account credit</Card.Text>
                <Card.Text className="card-text">{moviesCheckedOutCount} movies currently checked out </Card.Text>
                <Button onClick={ onSelectButtonClick}  variant="primary">
                    Select
                </Button>
            </Card.Body>
          </Card>
        )
    }
    

Customer.propTypes = {
    name: PropTypes.string, 
    city: PropTypes.string, 
    stateName: PropTypes.string, 
    phone: PropTypes.string, 
    accountCredit: PropTypes.number, 
    moviesCheckedOutCount: PropTypes.number,
    selectCustomerCallback: PropTypes.func
}

export default Customer;