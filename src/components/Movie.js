import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Movie = (props) => {
  const {id, title, overview, release_date,
         onSelectHandler} = props;
  
  const onMovieClick = () => {
    onSelectHandler(props.title); 
  }
  return (
    <tr>
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


export default Movie;