import React from 'react';
import PropTypes from 'prop-types';

import './Movie.css';

const Movie = (props) => {
  // Movie from SearchMatches gets onMovieAdd
  const displayAddButton = ( props.onMovieAdd === undefined) ? <button>Already in Library</button> : <button onClick = {() => props.onMovieAdd(props.id)}>Add Me</button>

  // Movie from Movies gets onMovieSelect
  const displayClickableTitle = (props.onMovieSelect === undefined) ? <h3>{props.title}</h3> : <h3 onClick={() => props.onMovieSelect(props.id)}>{props.title}</h3>
  
  return (
    // <section>
    //   <div class="card-image waves-effect waves-block waves-light">
    //     <img className="activator" src={props.image_url} alt={props.title} />
    //   </div>
    //   <div class="card-content">
    //     <span class="card-title activator grey-text text-darken-4">{ displayClickableTitle }<i class="material-icons right">more_vert</i></span>
    //   </div>
    //   <div class="card-reveal">
    //     <span class="card-title grey-text text-darken-4">{ props.title }<i class="material-icons right">close</i></span>
    //     <p>{props.overview}</p>
    //     <p>{props.release_date}</p>
    //     <p>{displayAddButton}</p>
    //   </div>
    // </section>




  <div class="column">
    <div class="card">
      <img src={ props.image_url } alt={ props.title } />
      <div class="cardTitle">
        <h6>{ displayClickableTitle }</h6>

      </div>
      <p>Released: { props.release_date }</p>
      <div class="card-footer">
        <p>{displayAddButton}</p>
      </div>
    </div>
  </div>

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