import mockUtil from '@/business/mock/base'

const options = {
  name: 'header',
  idGenerator: 0
}
const list = [
  {
    date: '2016-05-02',
    status: '0',
    province: 'sz',
    date2: '2016-05-02'
  },
  {
    date: '2016-05-04',
    status: '1',
    province: 'sh,sz',
    date2: '2016-05-02'
  },
  {
    date: 2232433534511,
    status: '1',
    province: 'gz',
    date2: '2016-05-02'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
