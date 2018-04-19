import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Home from './Home'
import History from './History'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/history/:ticker" component={History}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
