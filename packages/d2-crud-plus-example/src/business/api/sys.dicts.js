import request from '@/plugin/axios'

export function GetDictData (url) {
  return request({
    url: url,
    method: 'get'
  })
}
