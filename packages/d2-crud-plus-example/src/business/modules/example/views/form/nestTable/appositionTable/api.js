import request from '@/business/api/request.mock'

export function GetList (query) {
  return request({
    url: '/appositionTable/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/appositionTable/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/appositionTable/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/appositionTable/delete',
    method: 'post',
    params: { id }
  })
}
