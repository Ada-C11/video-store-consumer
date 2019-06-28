import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Result.css"


const Result = (props) => {

  return (
    <div className="result card">
        <div className="result__section card-body">
          <h3 className="result__title card-title">{props.title}</h3>
            <img className="image card-img-top" src={props.image_url} alt="this is an image"/>
            <div className="middle">
              <div className="text card-text">{props.overview}</div>
            </div>
          <div className="result__info">
            <span>
              <button className="select__result btn btn-dark" onClick={() => props.addMovieCallback(props)}>
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
