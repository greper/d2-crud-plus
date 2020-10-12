import request from '@/business/api/request.mock'
import { TreeNodesLazyLoader } from './pcas-data'

export function GetList (query) {
  return request({
    url: '/area/page',
    method: 'get',
    data: query
  })
}

export function AddObj (obj) {
  return request({
    url: '/area/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/area/update',
    method: 'post',
    data: obj
  })
}

export function DelObj (id) {
  return request({
    url: '/area/delete',
    method: 'post',
    data: { id }
  })
}

export function GetTreeChildrenByParentId (parentId) {
  return TreeNodesLazyLoader.getChildren(parentId)
}

export function GetNodesByValues (values) {
  return TreeNodesLazyLoader.getNodesByValues(values)
}
