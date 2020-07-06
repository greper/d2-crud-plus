import mockUtil from '@/business/mock/base'

const options = {
  name: 'd2crud',
  idGenerator: 0
}
const list = [
  {
    createDate: new Date().getTime() - 900000,
    text: '111',
    status: '1'
  },
  {
    createDate: new Date().getTime() - 800000,
    text: '222',
    status: '1'
  },
  {
    createDate: new Date().getTime() - 70000,
    text: '333',
    status: '1'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
