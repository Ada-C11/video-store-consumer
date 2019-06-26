import React from 'react';
import Button from 'react-bootstrap/Button'

const MovieCard = (props) => {
    const {image_url, title, overview, release_date,addMovieCallback } = props;
    const addMovie = () => {
        addMovieCallback(props);
    }
    return (
        <tr>
            <td><img src={image_url} alt={title}/></td>
            <td>{title}</td>
            <td>{overview}</td>
            <td>{release_date}</td>
            <td><Button onClick={addMovie}>Add to Library</Button></td>
        </tr>
    )
}

export default MovieCard;