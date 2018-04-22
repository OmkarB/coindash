import { createAction } from 'redux-actions'

export const selectTicker = createAction('SELECT_TICKER')
export const receiveHistory = createAction('RECEIVE_HISTORY')
export const fetchCurrentPrices = createAction('FETCH_CURRENT_PRICES')
export const receiveCurrentPrices = createAction('RECEIVE_CURRENT_PRICES')
export const fetchPortfolio = createAction('FETCH_PORTFOLIO')
export const updatePortfolio = createAction('UPDATE_PORTFOLIO')
export const receivePortfolio = createAction('RECEIVE_PORTFOLIO')
