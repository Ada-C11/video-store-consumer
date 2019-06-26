import React from 'react'
import PropTypes from 'prop-types';

const Movie = (props) => {
  const onMovieSelect = (event) => {
    props.selectMovieCallback(props.title);
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.overview}</p>
      <p>Release date: {props.release_date}</p>
      <img src={props.image_url}/>
      <input
        type="button"
        value="Select this Movie"
        onClick={onMovieSelect}
      />
    </div>
  )
}

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number,
  selectMovieCallback: PropTypes.func
}

export default Movie