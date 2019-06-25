import React from 'react';

const Movies = (props) => {
    console.log(props.movieList)
    return (
        <section>
            <h1>Pizza For Everyone!!</h1>
            {props.movieList}
        </section>
        

    )
};

export default Movies;
