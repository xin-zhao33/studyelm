import _fetch from '../utils/request'

export const navbar = params => {
  return _fetch({
    url: '/v2/pois/'+params,
    method: 'get',
  })
}

export const foodList = () => {
  return _fetch({
    url: 'v2/index_entry',
    method: 'get',
  })
}