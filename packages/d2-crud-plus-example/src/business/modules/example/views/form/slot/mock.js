import mockUtil from '@/business/mock/base'

const options = {
  name: 'slot',
  idGenerator: 0
}
const list = [
  {
    createDate: new Date().getTime() - 900000,
    updateDate: new Date().getTime() - 10000,
    slotExample: '可以愉快的写filter啦',
    topics: ['slot插槽自定义组件'],
    render: 'jsx 方式render'
  },
  {
    createDate: new Date().getTime() - 800000,
    updateDate: new Date().getTime() - 20000,
    slotExample: '可以愉快的写filter啦',
    render: 'jsx 方式render'
  },
  {
    createDate: new Date().getTime() - 70000,
    updateDate: new Date().getTime() - 30000,
    slotExample: '可以愉快的写filter啦',
    render: 'jsx 方式render'
  },
  {
    createDate: new Date().getTime() - 9990000,
    updateDate: new Date().getTime() - 40000,
    slotExample: '可以愉快的写filter啦',
    render: 'jsx 方式render'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
