import mockUtil from '../../../mock/base'

let options = {
  name: 'upload',
  idGenerator: 0
}
const list = [
  {
    id: ++options.idGenerator,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  },
  {
    id: ++options.idGenerator,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
