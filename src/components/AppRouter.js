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

const VIDEO_STORE_API_URL = 'https://video-store-api-sh.herokuapp.com/';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  generateMovieComponents = (movieList) => {
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
            render={(props) => 
              <Search 
                generateMovieComponentsCallback={this.generateMovieComponents} 
                url={ VIDEO_STORE_API_URL } 
              />}
          />
          <Route
            path="/library/"
            // component={Library}
            render={(props) => 
              <Library 
                generateMovieComponentsCallback={this.generateMovieComponents} 
                url={ VIDEO_STORE_API_URL } 
              />}
          />
          <Route path="/customers/" component={Customers} />
        </div>
      </Router>
    );
  };
};

export default AppRouter;
