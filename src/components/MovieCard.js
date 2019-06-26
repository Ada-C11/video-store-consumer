// import React from 'react';
// import PropTypes from 'prop-types';

// const MovieCard = (props) => {
//   const { title, release_date, overview, image_url } = props.movie;
//   return (
//     <div>
//       <h4>{ title }</h4>
//       <img src={image_url} alt={title} />
//       <div>{ release_date }</div>
//       <p>{ overview }</p>
//       <button type="button" onClick={props.selectMovie}>Select Movie</button>
//       <button type="button" onClick={() => {this.props.addMovieCallback(movie)}}>Add Movie to Library</button>
//     </div>
//   );
// };


// MovieCard.propTypes = {
//   selectMovie: PropTypes.func.isRequired,
//   movie: PropTypes.object.isRequired,
// }

// export default MovieCard;

import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = (props) => {
  const { title, release_date, overview, image_url } = props.movie;
  const displayButton = props.filterMovies(props.movie.title) ? <button type="button" onClick={props.selectMovie}>Select Movie</button> : <button type="button" onClick={() => {props.addMovieCallback(props.movie)}}>Add Movie to Library</button>
  return (
    <div>
      <h4>{ title }</h4>
      <img src={image_url} alt={title} />
      <div>{ release_date }</div>
      <p>{ overview }</p>
      {displayButton}
    </div>
  );
};


MovieCard.propTypes = {
  selectMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  filterMovies: PropTypes.func,
}

export default MovieCard;