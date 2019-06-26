import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

const Movie = (props) => {
  const {id, title, overview, release_date, image_url,
         onSelectHandler} = props;
  
  const onMovieClick = () => {
    onSelectHandler(props.title); 
  }
  return (
    <tr>
      <td><img src={image_url} alt={`movie poster for ${title}`} /></td>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{overview}</td>
      <td>{release_date}</td>
      <td>
        <button className="btn btn-primary" onClick={onMovieClick} >
          Select
        </button>
      </td>
    </tr>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number,
  onSelectHandler: PropTypes.func,
};


export default Movie;