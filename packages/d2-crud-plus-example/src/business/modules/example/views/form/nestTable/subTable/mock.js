import mockUtil from '@/business/mock/base'
const options = {
  name: 'subTable',
  idGenerator: 0
}
const list = [
  {
    date: '2016-05-02',
    name: '小红'
  },
  {
    date: '2016-05-04',
    name: '小黄'
  },
  {
    date: 2232433534511,
    name: '小蓝'
  },
  {
    date: '2016-05-03',
    name: '小绿'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
