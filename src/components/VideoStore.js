import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieLibrary from './MovieLibrary';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class VideoStore extends Component {
    constructor() {
        super();

        this.state = {
            currentMovie: "",
            currentCustomer: 0
        };
    }

    componentDidMount() {

    }

    currentCustomerCallback = (id) => {
        this.setState({
            currentCustomer: id,
        })
    }

    currentMovieCallback = (movie) => {
        this.setState({
            currentMovie: movie,
        })
    }

    render() {
        return (
            <section className="movielibrary-button">
                <MovieLibrary
                    currentMovieCallback={this.currentMovieCallback}
                    currentCustomerCallback={this.currentCustomerCallback}
                />
            </section>
        );
    }
}


// function Home() {
//     return <h3>Home</h3>
// }

// function Search() {
//     return <h3>Search Movies</h3>
// }

// function MovieLibrary() {
//     return <h3>Movie Library</h3>
// }

// function CustomerList() {
//     return <h3>Customer List</h3>
// }

// function VideoStoreRouter() {
//     return (
//         <Router>
//             <div>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//         </Router>
//     )
// }

export default VideoStore;