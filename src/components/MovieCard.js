import React from 'react';
import Button from 'react-bootstrap/Button'

const MovieCard = (props) => {
    const {image_url, title, overview, release_date,addMovieCallback } = props;
    const addMovie = () => {
        addMovieCallback(props);
    }
    return (

        <tr>
            <td className="movie_container">
            <img src={image_url} alt={title}/>
            <div className="movie_description">
                <h3 className="title">{title}</h3>
                <p><span className="bold_words">Release Date: </span>{release_date}</p>
                <p><span className="bold_words">Overview: </span>{overview.length > 200 ? `${overview.substring(0, 150)}...` : overview}</p>
                <Button onClick={addMovie}>Add to Library</Button>
            </div>
            </td>
        </tr>
    )
}

export default MovieCard;