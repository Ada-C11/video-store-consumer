import React, { Component } from "react";
import "./Movie.css";

class Movie extends Component {

  onSelectedClick = () => {
    this.props.sendToLibrayCallback(this.props);
  };

  render() {
    return (
      <section>
        <div className="card w-75">
          <div className="card-body">
            <img
              className="card-img-top"
              src={"https://image.tmdb.org/t/p/w185/" + this.props.image}
              alt="Card image cap"
            />
            <h5 className="card-title">Title: {this.props.title}</h5>
            <p className="card-text">ID: {this.props.id}</p>
            <p className="card-text">Overview: {this.props.overview}</p>
            <p className="card-text">Release Date: {this.props.releaseDate}</p>
            <button
              type="button"
              className="block"
              aria-label="Close"
              onClick={this.onSelectedClick}
            >
              SELECT
            </button>{" "}
          </div>
        </div>
      </section>
    );
  }
}

export default Movie;
