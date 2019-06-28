import React from "react";
import Popup from "reactjs-popup";
import './MoviePopup2.css'

const MoviePopup = (props) => {
  const { movie, buttonText } = props;
  const { index, title, overview, release_date, image_url, id, inventory, callbackFunction } = movie;
  return (
    <div>
      <Popup
        className="modal"
        trigger={<button className="button"> Details </button>} modal>
        {close => (
          <div
            className="popup">
            <h3>{title}</h3>
            <div className="popup-body">

              <img className="popup-photo" src={image_url} />
              <ul className="popup-content">
                <li>Release Date: {release_date}</li>
                <li>ID: {id}</li>
                <li>Inventory: {inventory}</li>
                <li>Overview:</li>
                <li>{overview}</li>
              </ul>
            </div>

            <button
              className="button"
              value={index}
              onClick={() => { callbackFunction(index) }}
            >
              {buttonText}
            </button>
            <a className="close" onClick={close}>
              &times;
            </a>

          </div>

        )}
      </Popup>
    </div>
  )
};





export default MoviePopup;