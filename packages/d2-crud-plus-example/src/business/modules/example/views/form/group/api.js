import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/group/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/group/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/group/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/group/delete',
    method: 'post',
    data: { id }
  })
}
