import { request } from '@/api/service'
const apiPrefix = '/permission/manager/resource'
export function GetList (query) {
  return request({
    url: apiPrefix + '/page',
    method: 'get',
    params: query
  })
}
export function GetTree (query) {
  return request({
    url: apiPrefix + '/tree',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: apiPrefix + '/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { id }
  })
}

export function GetObj (id) {
  return request({
    url: apiPrefix + '/info',
    method: 'get',
    params: { id }
  })
}
