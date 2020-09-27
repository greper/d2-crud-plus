import mockUtil from '@/business/mock/base'

const options = {
  name: 'export',
  idGenerator: 0
}
const list = [
  {
    createDate: '2020-09-27 20:21',
    name: '张三',
    status: '1',
    avatar1: 'http://greper.veryreader.com/extends/avatar.jpg',
    select_local: 'sz',
    iconSelect: 'refresh',
    switch: true
  },
  {
    createDate: '2020-09-27 20:21',
    name: '李四',
    status: '2',
    avatar1: 'http://greper.veryreader.com/extends/avatar.jpg',
    select_local: 'sh',
    iconSelect: 'refresh',
    switch: true
  },
  {
    createDate: '2020-09-27 20:21',
    name: '王五',
    status: '0',
    avatar1: 'http://greper.veryreader.com/extends/avatar.jpg',
    select_local: 'gz',
    iconSelect: 'refresh',
    switch: true
  }
]

options.list = list
options.copyTimes = 1000
const mock = mockUtil.buildMock(options)
export default mock
