import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/rowHandleDropdown/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/rowHandleDropdown/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/rowHandleDropdown/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/rowHandleDropdown/delete',
    method: 'post',
    data: { id }
  })
}
