import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/header/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/header/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/header/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/header/delete',
    method: 'post',
    params: { id }
  })
}
