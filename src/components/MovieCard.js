import React, {Component} from 'react';

const MovieCard = (props) => {
    const {image_url, title, overview, release_date} = props;
    return (
        <tr>
            <td><img src={image_url} alt={title}/></td>
            <td>{title}</td>
            <td>{overview}</td>
            <td>{release_date}</td>
            <td><button>Add to Library</button></td>
        </tr>
    )
}

export default MovieCard;