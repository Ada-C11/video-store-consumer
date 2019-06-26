import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Customer.css';

// import './Home.css';

function Movie (props) {
  const onTitleClick = () => {
    props.addMovieToRentCallback(props.title)
  }

  return (

    <tr onClick={onTitleClick}>
        <td scope="row">{props.id}</td>
        <td scope="row"><img src={props.image_url}/></td>
        <td scope="row">{props.title}</td>
        <td scope="row">{props.overview}</td>
        <td scope="row">{props.release_date}</td>
      </tr>
  )
}

export default Movie;