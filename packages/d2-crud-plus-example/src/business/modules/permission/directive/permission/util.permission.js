import store from '@/store'

export default {
  hasPermissions (value) {
    let need = []
    if (typeof value === 'string') {
      need.push(value)
    } else if (value && value instanceof Array && value.length > 0) {
      need = need.concat(value)
    }
    if (need.length === 0) {
      throw new Error('need permissions! Like v-permission="usersphere:user:view" ')
    }
    const userPermissionList = store.getters['permission/permissions']
    return userPermissionList.some(permission => {
      return need.includes(permission)
    })
  }
}
