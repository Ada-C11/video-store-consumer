import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Movie = (props) => {
  const {id, title, overview, release_date,
         buttonName, onSelectHandler} = props;
  console.log(props)
  const onMovieClick = () => {
    onSelectHandler(title); 
  }
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{overview}</td>
      <td>{release_date}</td>
      <td>
        <button className="btn btn-primary" onClick={onMovieClick} >
          {buttonName}
        </button>
      </td>
    </tr>
  );
}


export default Movie;