import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import MovieSearch from './components/MovieSearch'


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <App />, document.getElementById('root')
);
registerServiceWorker();
