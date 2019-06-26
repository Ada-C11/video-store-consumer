import Moment from 'react-moment';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Toast} from 'react-bootstrap'

import './Notification.css'



class Notification extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showToast: true,
        }
    }
    render() {
        const {error, toastTitle, toastMessage, toastTimestamp} = this.props;
        const {showToast} = this.state;
        const toggleShowToast = () => this.setState({ showToast: !showToast });
        return (
            <div className="notification">
                <Toast className={error ? 'error' : 'success'}show={showToast} onClose={toggleShowToast}>
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
    
}

Notification.propTypes = {
    error: PropTypes.bool, 
    toastTitle:PropTypes.string, 
    toastMessage:PropTypes.string, 
    toastTimestamp:PropTypes.instanceOf(Date)
}
export default Notification;