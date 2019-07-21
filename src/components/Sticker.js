import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './sticker.css';


class Sticker extends Component {
    render() {
        return (
            <div className="sticker">
                <div class="target"></div>
                <div class="image"></div>
            </div>
            // <div className="finalSticker">
            //     <div class="finalSticker"></div>
            // </div>
        )
    }
}
  
export default Sticker;