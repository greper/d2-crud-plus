import request from '@/plugin/axios'
export function getUserInfo () {
  return request({
    url: '/auth/user/info',
    method: 'get'
  })
}
export function getPermissions (platformCode) {
  return request({
    url: '/auth/user/permissions',
    method: 'get',
    params: { platformCode }
  })
}
