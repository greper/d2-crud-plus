import mockUtil from '../../../../../mock/base'

let options = {
  name: 'cropper',
  idGenerator: 0
}
const list = [
  {
    id: 1,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    multi: ['http://qiniu.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    aspectRatio: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  },
  {
    id: 2,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    multi: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    aspectRatio: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
