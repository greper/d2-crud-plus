import mockUtil from '@/business/mock/base'

const options = {
  name: 'searchOrder',
  idGenerator: 0
}
const list = [
  {
    status: '0',
    mselect: 'sz',
    status2: '1',
    cascader1: ['zhinan', 'shejiyuanze', 'yizhi'],
    checkbox: '0',
    checkedRadio: '1'
  },
  {
    status: '1',
    status2: '0',
    mselect: 'sh,sz',
    slotExample: 'slotExample',
    checkbox: '0'
  },
  {
    status: '2',
    mselect: 'wh,gz',
    slotExample: 'slotExample',
    checkbox: '0'
  }
]

options.list = list
options.copyTimes = 1000
const mock = mockUtil.buildMock(options)

export default mock
