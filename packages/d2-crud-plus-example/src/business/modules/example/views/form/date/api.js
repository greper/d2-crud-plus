import request from '@/plugin/axios'
export function GetList (query) {
  return request({
    url: '/date/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/date/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/date/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/date/delete',
    method: 'post',
    params: { id }
  })
}
export function BatchDel (ids) {
  return request({
    url: '/date/batchDelete',
    method: 'post',
    data: { ids }
  })
}
