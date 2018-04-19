import { combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import * as actions from './actions.js'

const selectedTicker = handleActions({
  [actions.selectTicker]: (state, action) => action.payload,
}, 'BTC')

const history = handleActions({
  [actions.receiveHistory]: (state, action) => action.payload,
}, [])

export default combineReducers({ selectedTicker, history })
