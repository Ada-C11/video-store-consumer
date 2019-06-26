import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Customer.css';

function Movie (props) {
  const onTitleClick = () => {
    props.addMovieToRentCallback(props.title)
  }

  const dateParsing = () => {
    let year = ""
    let month = ""
    let date = ""
    if (props.release_date) {
      year = props.release_date.slice(0, 4)
      month = props.release_date.slice(5, 7)
      date = props.release_date.slice(8, 10)
    }
    return month + '/' + date + '/' + year
  }

  return (
    <tr onClick={onTitleClick}>
      <td scope="row">{props.id}</td>
      <td scope="row"><img src={props.image_url}/></td>
      <td scope="row">{props.title}</td>
      <td scope="row">{props.overview}</td>
      <td scope="row">{dateParsing()}</td>
    </tr>
  )
}

export default Movie;