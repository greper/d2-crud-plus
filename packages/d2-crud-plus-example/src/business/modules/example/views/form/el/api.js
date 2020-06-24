import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/el/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/el/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/el/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/el/delete',
    method: 'post',
    data: { id }
  })
}
