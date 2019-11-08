import mockUtil from '../../../mock/base'

let options = {
  name: 'upload',
  idGenerator: 0
}
const list = [
  {
    id: 1,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  },
  {
    id: 2,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
