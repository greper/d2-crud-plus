import mockUtil from '@/business/mock/base'

const options = {
  name: 'tree',
  idGenerator: 0
}
const list = [
  {
    tree1: [10000],
    tree2: [100014, 100015],
    tree3: 10010
  }

]
options.list = list

const mock = mockUtil.buildMock(options)
mock.push({
  path: '/area/tree',
  method: 'get',
  handle (req) {
    const tree = [
      { id: 10000, label: '北京市', children: [{ id: 100003, label: '市辖区', children: [{ id: 100004, label: '东城区' }, { id: 100005, label: '西城区' }] }] },
      { id: 10010, label: '天津市', children: [{ id: 100013, label: '市辖区', children: [{ id: 100014, label: '天津湾' }, { id: 100015, label: '渤海湾' }] }] }
    ]
    return {
      code: 0,
      msg: 'success',
      data: tree
    }
  }
})
export default mock
