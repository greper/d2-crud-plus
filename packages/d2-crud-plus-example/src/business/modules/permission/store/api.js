import { request } from '@/api/service'
export function getUserInfo () {
  return request({
    url: '/auth/user/info',
    method: 'get'
  })
}
export function getPermissions () {
  return request({
    url: '/auth/user/permissions',
    method: 'get'
  })
}
