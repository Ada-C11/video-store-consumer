import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './SelectedInfo.css';

class SelectedInfo extends Component {
    render() {
        return (
            <div className="selected-info">
                <div><strong>current customer:</strong><br/>{this.props.customer}<br/></div>
                <div><strong>current movie:</strong><br/>{this.props.movie}</div>
            </div>
        )
    }
}

export default SelectedInfo
