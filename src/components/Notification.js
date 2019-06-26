import Moment from 'react-moment';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Toast} from 'react-bootstrap'

import './Notification.css'



const Notification = (props) =>  {
        const {error, toastTitle, toastMessage, toastTimestamp, dismissNotification} = this.props;

        const onCloseHandler = () => dismissNotification(this.props.id);

        return (
            <div className="notification">
                <Toast className={error ? 'error' : 'success'} onClose={onCloseHandler}>
                <Toast.Header>
                    <strong className="mr-auto">{toastTitle}</strong>
                    <small>
                        <Moment fromNow>{toastTimestamp}</Moment>
                    </small>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
            </div>
            
        )
    }
    


        
    


Notification.propTypes = {
    error: PropTypes.bool, 
    toastTitle:PropTypes.string, 
    toastMessage:PropTypes.string, 
    toastTimestamp:PropTypes.number,
    dismissNotification:PropTypes.func
}
export default Notification;