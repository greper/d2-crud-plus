import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/export/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/export/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/export/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/export/delete',
    method: 'post',
    data: { id }
  })
}
