import mockUtil from '../../../mock/base'

let options = {
  name: 'select',
  idGenerator: 0
}
const list = [
  {
    status: '0',
    mselect: 'sz',
    cascader: ['zhinan', 'shejiyuanze', 'yizhi']
  },
  {
    status: '1',
    mselect: 'sh,sz',
    slotExample: 'slotExample'
  },
  {
    status: '1',
    mselect: 'gz',
    slotExample: 'slotExample'
  },
  {
    date: '2016-05-03',
    status: '2',
    mselect: 'wh,gz',
    slotExample: 'slotExample'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
