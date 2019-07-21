import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Sticker from './Sticker';
import './sticker.css';

class StickerBoard extends Component {
    render() {
        return (
        <div >
          <div className="stickerBoard">
              <Sticker/><Sticker/><Sticker/>
          </div>
        </div>
        )
    }
  }
  
  export default StickerBoard;