import { createAjaxRoute } from './helpers'

export const fetchHistory = ticker => {
  return createAjaxRoute({
    url: `/api/v1/prices/${ticker.toUpperCase()}`,
    method: 'GET',
  })
  .map((data) => data.response.data)
}

export const fetchCurrentPrices = ticker => {
  return createAjaxRoute({
    url: `/api/v1/currentprices`,
    method: 'GET',
  })
  .map((data) => data.response.data)
}

export const fetchPortfolio = id => {
  return createAjaxRoute({
    url: `/api/v1/portfolios/7`,
    method: 'GET',
  })
  .map((data) => data.response.data)
}

export const updatePortfolio = portfolio => {
  return createAjaxRoute({
    url: `/api/v1/portfolios/7`,
    method: 'PATCH',
    body: JSON.stringify({
      portfolio,
      user_id: 1,
    }),
  })
  .map((data) => data.response.data)
}
