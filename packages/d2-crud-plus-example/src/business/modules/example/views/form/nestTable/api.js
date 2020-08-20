import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/nestTable/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/nestTable/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/nestTable/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/nestTable/delete',
    method: 'post',
    data: { id }
  })
}
