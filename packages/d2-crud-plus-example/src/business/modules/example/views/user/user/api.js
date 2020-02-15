import request from '@/plugin/axios'
const apiPrefix = '/user/user'
export function GetList (query) {
  return request({
    url: apiPrefix + '/page',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: apiPrefix + '/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { id }
  })
}
