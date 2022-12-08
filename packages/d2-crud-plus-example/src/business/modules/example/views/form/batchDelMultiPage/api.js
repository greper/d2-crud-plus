import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/batchDel/page',
    method: 'get',
    data: query
  })
}
export function AddObj (obj) {
  return request({
    url: '/batchDel/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/batchDel/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/batchDel/delete',
    method: 'post',
    data: { id }
  })
}

export function BatchDel (ids) {
  return request({
    url: '/batchDel/batchDelete',
    method: 'post',
    data: { ids }
  })
}
