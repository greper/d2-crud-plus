import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/upload/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/upload/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/upload/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/upload/delete',
    method: 'post',
    params: { id }
  })
}
