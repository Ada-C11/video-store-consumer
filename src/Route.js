import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Library from './components/Library'
import CustomerList from './components/CustomerList'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/movies" component={Library} />
      <Route path="/customers" component={CustomerList} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))