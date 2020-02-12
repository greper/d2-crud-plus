import request from '@/plugin/axios'
export function getUserInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}
export function getPermissions () {
  return request({
    url: '/user/permissions',
    method: 'get'
  })
}
