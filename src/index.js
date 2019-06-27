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
      <Route exact path="/" component={() => <App />} />
      <Route path="/MovieLibrary" component={() => <App page="library" />} />
      <Route path="/MovieSearchForm" component={() => <App page="search" />} />
      <Route path="/CustomerList" component={() => <App page="list" />} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
registerServiceWorker();
