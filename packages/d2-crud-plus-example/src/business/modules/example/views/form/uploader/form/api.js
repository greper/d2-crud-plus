import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/upload/form/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/upload/form/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/upload/form/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/upload/form/delete',
    method: 'post',
    data: { id }
  })
}
