import request from '@/plugin/axios'
export function GetList (query) {
  return request({
    url: '/fix/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/fix/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/fix/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/fix/delete',
    method: 'post',
    params: { id }
  })
}
