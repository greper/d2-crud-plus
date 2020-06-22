import mockUtil from '@/business/mock/base'

const options = {
  name: 'icon',
  idGenerator: 0
}
const list = [
  {
    iconSelect: 'check',
    iconSelect2: 'check'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
