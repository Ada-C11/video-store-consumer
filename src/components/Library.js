import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';


const Library = (props) => {
  const mappedMovies = props.allMovies.map((movie, i) => {
    return(
      <p key={i}> {movie.title} </p>
    );
  });


  return(
    <div>
      <section>
        <button type='button' onClick={props.toggleDisplayStatusCallback}>
          See All Movies
        </button>
      </section>
    
      {props.displayStatus && <section>
        {mappedMovies}
     
      </section>}

    </div>
    
  );
}

export default Library;