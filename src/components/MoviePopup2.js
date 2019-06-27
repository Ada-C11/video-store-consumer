import React from "react";
import Popup from "reactjs-popup";
import './MoviePopup2.css'

const MoviePopup = (props) => {
  const { movie, buttonText } = props;
  const { index, title, overview, release_date, image_url, callbackFunction } = movie;
  console.log("inside popup")
  return (
    <div>
      <Popup
        className="modal"
        trigger={<button className="button"> Open Modal </button>} modal>
        <div
          className="popup">
          <h3
          >{title}</h3>
          <ul>
            <li><img src={image_url} /></li>
            <li>{release_date}</li>
            <li>{overview}</li>
          </ul>
          <button
            value={index}
            onClick={() => { callbackFunction(index) }}
          >
            {buttonText}
          </button>

        </div>
      </Popup>
    </div>
  )
};





export default MoviePopup;