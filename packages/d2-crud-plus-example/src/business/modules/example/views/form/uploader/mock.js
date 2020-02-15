import mockUtil from '../../../../../mock/base'

let options = {
  name: 'upload',
  idGenerator: 0
}
const list = [
  {
    id: 1,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: ['http://qiniu.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    image: ['http://qiniu.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png']
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
