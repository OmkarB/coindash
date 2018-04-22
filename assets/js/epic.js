import { combineEpics } from 'redux-observable'
import Cookies from 'js-cookie'
import { Observable } from 'rxjs'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/empty'

import 'rxjs/add/operator/pluck'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'

import * as actions from './actions'
import * as selectors from './selectors'
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

const fetchPortfolio = (action$) => {
  return action$
    .ofType(actions.fetchPortfolio.toString())
    .switchMap(() => {
      return api.fetchPortfolio().map(actions.receivePortfolio)
    })
}

const updatePortfolio = (action$, store) => {
  return action$
    .ofType(actions.updatePortfolio.toString())
    .switchMap(() => {
      const portfolio = selectors.getPortfolio(store.getState())
      return api.updatePortfolio(portfolio).map(actions.receivePortfolio)
    })
}

const createUser = (action$) => {
  return action$
    .ofType(actions.createUser.toString())
    .mergeMap(() => {
      Cookies.set('coindash_token', '13')
      return Observable.empty()
    })
}

export default combineEpics(fetchHistory, fetchCurrentPrices, fetchPortfolio, updatePortfolio, createUser)
