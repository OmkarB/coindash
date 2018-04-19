import { combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import * as actions from './actions.js'

const selectedTicker = handleActions({
  [actions.selectTicker]: (state, action) => action.payload,
}, 'BTC')

export default combineReducers({ selectedTicker })
