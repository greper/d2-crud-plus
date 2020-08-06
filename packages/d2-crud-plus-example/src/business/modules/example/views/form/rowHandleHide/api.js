import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/rowHandleHide/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/rowHandleHide/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/rowHandleHide/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/rowHandleHide/delete',
    method: 'post',
    data: { id }
  })
}
