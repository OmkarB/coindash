import { Observable } from 'rxjs'

export const createAjaxRoute = (routeOpts) => {
  const opts = {
    url: routeOpts.url,
    method: routeOpts.method,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    body: routeOpts.body,
  }
  return Observable.ajax(opts)
}
