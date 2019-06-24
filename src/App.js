import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library'


function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class AppRouter extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentMovie: {},
    }
  }

  onSelectMovie = (movieData) => {
    this.setState ({
      currentMovie: {
        title: movieData.title,

      },
    });
    
  }

  render () {
    console.log (this.state.currentMovie.title);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/library/">Library</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
  <Route path="/library/" render={(props) => <Library {...props} onSelectMovieCallback={this.onSelectMovie} />} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  )};
}

export default AppRouter;
