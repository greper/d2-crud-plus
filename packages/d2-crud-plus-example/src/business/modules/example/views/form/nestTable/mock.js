import mockUtil from '@/business/mock/base'
const options = {
  name: 'nestTable',
  idGenerator: 0
}
const list = [
  {
    date: '2016-05-02',
    status: '0',
    province: 'sz',
    nestId: 1
  },
  {
    date: '2016-05-04',
    status: '1',
    province: 'sh,sz',
    nestId: 1
  },
  {
    date: 2232433534511,
    status: '1',
    province: 'gz',
    nestId: 1
  },
  {
    date: '2016-05-03',
    status: '2',
    province: 'wh,gz',
    nestId: 1
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
