import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/upload/alioss/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/upload/alioss/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/upload/alioss/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/upload/alioss/delete',
    method: 'post',
    data: { id }
  })
}
