import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/test/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/test/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/test/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/test/delete',
    method: 'post',
    params: { id }
  })
}
