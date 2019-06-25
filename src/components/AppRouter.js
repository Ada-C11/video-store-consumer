import React, { Component } from 'react';
// import logo from './logo.svg';
// import './AppRouter.css';

import Movie from './Movie'
import Search from './Search';
import Library from './Library';
import Customers from './Customers';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

// function Search() {
//   return <h2>Search Movies</h2>;
// }

// function Library() {
//   return <h2>Movie Library</h2>;
// }

// function Customers() {
//   return <h2>Customers</h2>;
// }
const generateMovieComponents = (movieList) => {
  return movieList.map((movie, i) => {
    return (
      <Movie
        key={movie.id}
        index={i}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        release_date={movie.release_date}
        image_url={movie.image_url}
      />
    )
  })

}

class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search Movies</Link>
              </li>
              <li>
                <Link to="/library/">Movie Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route
            path="/search/"
            // component={Search} 
            render={(props) => <Search generateMovieComponentsCallback={generateMovieComponents} />}
          />
          <Route
            path="/library/"
            // component={Library}
            render={(props) => <Library thing="thingy" />}
          />
          <Route path="/customers/" component={Customers} />
        </div>
      </Router>
    );
  };
};

export default AppRouter;
