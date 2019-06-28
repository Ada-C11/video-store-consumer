import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";
import { Route, BrowserRouter as Router } from "react-router-dom";

const routing = (
  <Router>
    <div>
      <Route path={["/:page", "/"]} component={App} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
registerServiceWorker();
