import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './Details.css';
// import './Library.css';

const Details = (props) => {
  const movieDetails = () => {
    return (
      // <Card>
      //   <Card.Body>
      //     <h3 className="title">{props.title}</h3>
      //     {/* <Card.Text><span className="bold_words">Overview: </span>{props.viewMovieDetails.title} </Card.Text> */}
      //     <Card.Text><span className="bold_words">Release Date: </span>{props.release_date} </Card.Text>
      //     <Card.Text><span className="bold_words">Overview: </span>{props.overview} </Card.Text>
      //     <p className="inline"><span className="bold_words">Id: </span>{props.id}</p>
      //     {/* <li>Release Date: {props.release_date}</li> */}
      //     <p className="inline"><span className="bold_words">External Id:  </span>{props.external_id}</p>
      //   </Card.Body>
      // </Card>

      <div>
        <h3 className="title">{props.title}</h3>
        <p><span className="bold_words">Release Date: </span>{props.release_date}</p>
        <p><span className="bold_words">Overview: </span>{props.overview}</p>
        {/* <p><span className="bold_words">Id: </span>{props.id}</p> */}
        {/* <p><span className="bold_words">External Id:  </span>{props.external_id}</p> */}
      </div>
    )
  };

  return movieDetails();
}

Details.propTypes = {
  // showMovie: PropTypes.array.isRequired,
};

export default Details;