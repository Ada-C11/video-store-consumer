import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const SearchResult = (props) => {
  const {id, title, overview, release_date, external_id, 
        image_url, onSelectHandler} = props;
  
  const onMovieClick = () => {
    onSelectHandler(props); 
  }
  return (
    <tr>
      <td><img src={image_url} alt={`movie poster for ${title}`} /></td>
      <td>{title}</td>
      <td>{overview}</td>
      <td>{release_date}</td>
      <td>
        <button className="btn btn-primary" onClick={onMovieClick} >
          Add to Library
        </button>
      </td>
    </tr>
  );
}


export default SearchResult;