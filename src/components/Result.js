import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Result.css"


const Result = (props) => {

  return (
    <div className="result card">
        <div className="result__section">
          <h3 className="result__title">{props.title}</h3>
            <img className="image" src={props.image_url} alt="this is an image"/>
            <div className="middle">
              <div className="text">{props.overview}</div>
            </div>
          <div className="result__info">
            <span>
              <button onClick={() => props.addMovieCallback(props)}>
                Add to Rental Library
              </button>
            </span> 
          </div>
        </div>
    </div>
  )
}


Result.propTypes = {
  id:PropTypes.number,
  title:PropTypes.string,
  overview:PropTypes.string,
  release_date:PropTypes.string,
  image_url:PropTypes.string,
  external_id:PropTypes.number,
  buttonClassname:PropTypes.string,
  getResultTitleCallback:PropTypes.func,
};

export default Result;
