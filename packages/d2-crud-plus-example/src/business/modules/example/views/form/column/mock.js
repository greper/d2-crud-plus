import mockUtil from '../../../../../mock/base'

let options = {
  name: 'column',
  idGenerator: 0
}
const list = [
  {
    data: 'data1',
    time: '2020-01-01 11:11:11',
    province: 'wh',
    amount: 100,
    children: [
      { id: 999,
        data: 'data1_1',
        time: '2020-01-01 11:11:11',
        province: 'gz,sh',
        amount: 100,
        children: [
          { id: 1000,
            data: 'data1_1_1',
            time: '2020-01-01 11:11:11',
            province: 'sz,gz',
            amount: 100
          }
        ]
      },
      { id: 888,
        data: 'data1_2',
        time: '2020-01-01 11:11:11',
        province: 'sh',
        amount: 100,
        children: [
          { id: 889,
            data: 'data1_2_1',
            time: '2020-01-01 11:11:11',
            province: 'gz',
            amount: 100
          }
        ]
      }
    ]
  },
  {
    data: 'data2',
    province: 'sh',
    time: '2020-01-01 11:11:11',
    amount: 100
  },
  {
    data: 'data3',
    province: 'sh,gz',
    time: '2020-01-01 11:11:11',
    amount: 100
  },
  {
    data: 'data4',
    province: 'sh,sz',
    time: '2020-01-01 11:11:11',
    amount: 100
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
