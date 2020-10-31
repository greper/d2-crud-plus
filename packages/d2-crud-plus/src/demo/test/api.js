import request from '../request'

export function GetList (query) {
  return request({
    url: '/test/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/toolbar/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/toolbar/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/toolbar/delete',
    method: 'post',
    data: { id }
  })
}
