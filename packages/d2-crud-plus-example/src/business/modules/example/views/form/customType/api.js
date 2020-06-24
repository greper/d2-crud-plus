import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/customType/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/customType/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/customType/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/customType/delete',
    method: 'post',
    data: { id }
  })
}
