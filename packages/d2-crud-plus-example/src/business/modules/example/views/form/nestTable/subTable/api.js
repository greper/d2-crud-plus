import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/subTable/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/subTable/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/subTable/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/subTable/delete',
    method: 'post',
    data: { id }
  })
}
