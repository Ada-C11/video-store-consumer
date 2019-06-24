import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoStore from './VideoStore'

class App extends Component {
  render() {
    return (
      <section>
        {<VideoStore />}
      </section>
    );
  }
}

export default App;
