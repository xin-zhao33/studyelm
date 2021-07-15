import _fetch from '../utils/request'

export const hotCity = (params) =>{
  return  _fetch({
    url: '/v1/cities',
    method: 'get',
    params
  })
}

export const getCityName = (params) =>{
  return  _fetch({
    url: '/v1/cities/' + params,
    method: 'get',
  })
}
