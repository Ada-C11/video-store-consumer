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
      <Route path={["/:page", "/"]} component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
registerServiceWorker();
