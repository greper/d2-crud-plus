import mockUtil from '@/business/mock/base'
import { crudOptions } from './crud'
const options = {
  name: 'fromBackend',
  idGenerator: 0
}
const list = [
  {
    status: '0',
    mselect: 'sz',
    cascader: ['zhinan', 'shejiyuanze', 'yizhi'],
    checkbox: '0',
    status_custom_1: '0',
    status_custom_2: '0',
    checkedRadio: '1',
    mcascader: [['zhinan', 'shejiyuanze', 'yizhi']]
  },
  {
    status: '1',
    status_custom_1: '1',
    status_custom_2: '2',
    mselect: 'sh,sz',
    slotExample: 'slotExample',
    checkbox: '0'
  },
  {
    date: '2016-05-03',
    status: '2',
    status_custom_1: '2',
    status_custom_2: '1',
    mselect: 'wh,gz',
    slotExample: 'slotExample',
    checkbox: '0'
  }
]

options.list = list
options.copyTimes = 1000
const mock = mockUtil.buildMock(options)

mock.push({
  path: '/fromBackend/crud',
  method: 'get',
  handle (req) {
    return {
      code: 0,
      msg: 'success',
      data: crudOptions
    }
  }
})

export default mock
