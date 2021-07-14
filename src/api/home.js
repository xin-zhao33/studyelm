import _fetch from '../utils/request'

export const hotCity = (params) =>{
  return  _fetch({
    url: '/v1/cities',
    method: 'get',
    params
  })
}