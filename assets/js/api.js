import { createAjaxRoute } from './helpers'

export const fetchHistory = ticker => {
  return createAjaxRoute({
    url: `/api/v1/prices/${ticker}`,
    method: 'GET',
  })
  .map((data) => data.response.data)
}
