import request from '@/plugin/axios'
export function GetList (query) {
  return request({
    url: '/upload/page',
    method: 'get'
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
