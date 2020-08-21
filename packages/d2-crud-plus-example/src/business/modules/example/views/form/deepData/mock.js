import mockUtil from '@/business/mock/base'

const options = {
  name: 'deepData',
  idGenerator: 0
}
const list = [
  {
    user: {
      name: 'greper',
      gender: 1
    },
    dept: {
      name: '研发部',
      status: '0'
    },
    checkbox: '0',
    checkedRadio: '1',
    role: [{ name: '管理员', code: 'admin' }]
  },
  {
    user: {
      name: '小明',
      gender: 1
    },
    dept: {
      name: '研发部',
      status: '0'
    },
    checkbox: '0',
    checkedRadio: '1'
  },
  {
    user: {
      name: '小红',
      gender: 2
    },
    dept: {
      name: '测试部',
      status: '0'
    },
    checkbox: '0',
    checkedRadio: '1'
  }
]

options.list = list
options.copyTimes = 1000
const mock = mockUtil.buildMock(options)
export default mock
