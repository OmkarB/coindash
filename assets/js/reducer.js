import { combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'

import * as actions from './actions.js'

const selectedTicker = handleActions({
  [actions.selectTicker]: (state, action) => action.payload,
}, 'BTC')

const history = handleActions({
  [actions.receiveHistory]: (state, action) => action.payload,
}, [])

const currentPrices = handleActions({
  [actions.receiveCurrentPrices]: (state, action) => action.payload,
}, {})

const portfolio = handleActions({
  [actions.receivePortfolio]: (state, action) => action.payload,
  [actions.setTickerAmount]: (state, action) => {
    return Object.assign(state, { [action.payload.ticker]: parseInt(action.payload.amount) }, {})
  },
}, {})

const password = handleActions({
  [actions.setPassword]: (state, action) => action.payload,
}, '')

const name = handleActions({
  [actions.setName]: (state, action) => action.payload,
}, '')

export default combineReducers({ selectedTicker, history, currentPrices, portfolio, password, name })
