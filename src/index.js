import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MovieLibrary from "./components/MovieLibrary";
import CustomerList from "./components/CustomerList";
import MovieSearchForm from "./components/MovieSearchForm";

import registerServiceWorker from "./registerServiceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/MovieLibrary">MovieLibrary</Link>
        </li>
        <li>
          <Link to="/MovieSearchForm">MovieSearchForm</Link>
        </li>

        <li>
          <Link to="/CustomerList">CustomerList</Link>
        </li>
      </ul> */}
      <Route exact path="/" component={App} />
      <Route path="/MovieLibrary" component={MovieLibrary} />
      <Route path="/MovieSearchForm" component={MovieSearchForm} />
      <Route path="/CustomerList" component={CustomerList} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
registerServiceWorker();
