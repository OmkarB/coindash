import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Home from './Home.js'

class App extends Component {
  render() {
    return <Home/>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
