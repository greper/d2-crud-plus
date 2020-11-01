import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/lineEdit/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/lineEdit/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/lineEdit/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/lineEdit/delete',
    method: 'post',
    data: { id }
  })
}
