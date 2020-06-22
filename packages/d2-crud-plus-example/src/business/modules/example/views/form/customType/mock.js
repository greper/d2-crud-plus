import mockUtil from '@/business/mock/base'

const options = {
  name: 'customType',
  idGenerator: 0
}
const list = [
  {
    date: '2550-12-11 11:11:11'
  },
  {
    date: '2550-11-11 11:11:11'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
