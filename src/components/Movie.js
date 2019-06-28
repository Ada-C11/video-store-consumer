import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {
  // Movie from SearchMatches gets onMovieAdd
  const displayAddButton = ( props.onMovieAdd === undefined) ? <button>Already in Library</button> : <button onClick = {() => props.onMovieAdd(props.id)}>Add Me</button>

  // Movie from Movies gets onMovieSelect
  const displayClickableTitle = (props.onMovieSelect === undefined) ? <h3>{props.title}</h3> : <h3 onClick={() => props.onMovieSelect(props.id)}>{props.title}</h3>
  
  return (
    <section>
      <p>
        { props.id }.
      </p>
      { displayClickableTitle }
      <p>
        Overview: {props.overview }
      </p>
      <p>
        Release Date: {props.release_date}
      </p>
      <p>
        External ID: {props.external_id}
      </p>
      <img src={props.image_url} alt={props.title} />
      { displayAddButton }
    </section>
  )
}

Movie.propTypes ={
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number,
  onMovieSelect: PropTypes.func,
  onMovieAdd: PropTypes.func,
}

export default Movie;