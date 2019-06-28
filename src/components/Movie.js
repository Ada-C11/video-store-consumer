import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {

    onClickButton = () => {
        this.props.onSelectMovieCallback(this.props);
    }

    render() {
        const { title, overview, release_date, image_url } = this.props;

        return (
            <div className="card">
                <div className="card-body">
                <img className="movie-image"
                    src={image_url}
                    alt="movie" />
                <p className="card-title"><strong>{title}</strong></p>
                <p className="card-subtitle mb-2 text-muted">{release_date ? parseInt(release_date) : ""}</p>
                <button
                    className="btn btn-primary"
                    onClick={this.onClickButton}
                >Select Movie
                </button>
                <p className="card-text">{overview}</p>
                </div>
            </div>
        )
    }
};

Movie.propTypes = {
    title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    image_url: PropTypes.string,
};

export default Movie;