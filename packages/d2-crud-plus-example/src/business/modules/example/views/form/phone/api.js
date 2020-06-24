import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/phone/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/phone/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/phone/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/phone/delete',
    method: 'post',
    data: { id }
  })
}
export function GetCustomName (callingCode, mobile) {
  return request({
    url: '/phone/customName',
    method: 'get',
    data: { callingCode, mobile }
  })
}
