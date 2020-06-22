import mockUtil from '@/business/mock/base'
const options = {
  name: 'el',
  idGenerator: 0
}
const list = [
  {
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
