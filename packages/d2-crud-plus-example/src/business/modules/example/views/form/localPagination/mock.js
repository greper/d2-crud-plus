import mockUtil from '@/business/mock/base'

const options = {
  name: 'localPagination',
  idGenerator: 0
}
const list = [
  {
    createDate: new Date().getTime() - 60000,
    text: '11111'
  },
  {
    text: '22222',
    createDate: new Date().getTime() - 30000
  },
  {
    text: '33333',
    createDate: new Date().getTime() - 70000
  }
]

function copyList (originList, newList, options, parentId) {
  for (const item of originList) {
    const newItem = { ...item, parentId }
    newItem.id = ++options.idGenerator
    newList.push(newItem)
    if (item.children != null) {
      newItem.children = []
      copyList(item.children, newItem.children, options, newItem.id)
    }
  }
}

options.list = list
const mock = mockUtil.buildMock(options)
mock.shift()
mock.push({
  path: '/localPagination/page',
  method: 'get',
  handle (req) {
    const newList = []
    for (let i = 0; i < 29; i++) {
      copyList(options.list, newList, options)
    }
    return {
      code: 0,
      msg: 'success',
      data: {
        total: newList.length,
        size: req.body.size,
        current: req.body.current,
        records: newList
      }
    }
  }
})
export default mock
