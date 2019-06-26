import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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


export default Movie;