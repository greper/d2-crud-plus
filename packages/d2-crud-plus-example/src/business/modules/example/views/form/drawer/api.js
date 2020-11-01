import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/drawer/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/drawer/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/drawer/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/drawer/delete',
    method: 'post',
    data: { id }
  })
}
