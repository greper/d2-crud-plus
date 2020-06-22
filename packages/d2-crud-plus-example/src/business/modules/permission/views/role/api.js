import { request } from '@/api/service'
const apiPrefix = '/permission/manager/role'
export function GetList (query) {
  return request({
    url: apiPrefix + '/page',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: apiPrefix + '/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: apiPrefix + '/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: apiPrefix + '/delete',
    method: 'post',
    params: { id }
  })
}

/**
 * 获取角色权限资源
 * @param roleId
 * @returns {*}
 * @constructor
 */
export function GetPermission (roleId) {
  return request({
    url: apiPrefix + '/getPermission',
    method: 'get',
    params: { roleId }
  })
}

/**
 * 授权
 * @param roleId
 * @param resourceIds
 * @returns {*}
 * @constructor
 */
export function DoAuthz (roleId, resourceIds) {
  return request({
    url: apiPrefix + '/authz',
    method: 'post',
    params: { roleId },
    data: resourceIds
  })
}
