import mockUtil from '../../../mock/base'

let options = {
  name: 'phone',
  idGenerator: 0
}
const list = [
  {
    code: '86',
    phone: '18601010202'
  },
  {
    country: 'CN',
    phone: '18601010202'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
mock.push({
  path: 'api/phone/getCustomName',
  method: 'get',
  handle (req) {
    return {
      code: 0,
      msg: 'success',
      data: '小明'
    }
  }
})
export default mock
