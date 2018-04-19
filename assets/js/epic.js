import { combineEpics } from 'redux-observable'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/empty'

import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'

import * as actions from './actions'
import * as api from './api'

const fetchCurrentPrices = (action$) => {
  return action$
    .ofType(actions.fetchCurrentPrices.toString())
    .switchMap(() => {
      return api.fetchCurrentPrices().map(actions.receiveCurrentPrices)
    })
}

const fetchHistory = (action$) => {
  return action$
    .ofType(actions.selectTicker.toString())
    .pluck('payload')
    .switchMap(ticker => {
      return api.fetchHistory(ticker).map(actions.receiveHistory)
    })
}

export default combineEpics(fetchHistory, fetchCurrentPrices)
