import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/editor/page',
    method: 'get',
    data: query
  })
}

export function GetObj (id) {
  return request({
    url: '/editor/get',
    method: 'get',
    params: { id }
  })
}

export function AddObj (obj) {
  return request({
    url: '/editor/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/editor/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/editor/delete',
    method: 'post',
    params: { id }
  })
}
