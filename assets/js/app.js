import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import epic from './epic.js'
import reducer from './reducer.js'

import Home from './Home.js'

const epicMiddleware = createEpicMiddleware(epic)
const store = createStore(reducer, applyMiddleware(epicMiddleware))
window.store = store

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home/>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
