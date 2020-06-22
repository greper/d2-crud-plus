import request from '@/business/api/request.mock'
export function GetList (query) {
  return request({
    url: '/icon/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/icon/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/icon/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/icon/delete',
    method: 'post',
    params: { id }
  })
}
export function GetCustomName (callingCode, mobile) {
  return request({
    url: '/icon/getCustomName',
    method: 'get',
    params: { callingCode, mobile }
  })
}
