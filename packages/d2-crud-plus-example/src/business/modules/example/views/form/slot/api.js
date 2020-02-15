import request from '@/plugin/axios'

export function GetList (query) {
  return request({
    url: '/slot/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/slot/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/slot/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/slot/delete',
    method: 'post',
    params: { id }
  })
}
