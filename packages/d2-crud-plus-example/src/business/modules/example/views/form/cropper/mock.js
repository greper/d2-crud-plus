import mockUtil from '../../../../../mock/base'

let options = {
  name: 'cropper',
  idGenerator: 0
}
const list = [
  {
    id: 1,
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    multi: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    aspectRatio: 'http://greper.veryreader.com/extends/avatar.jpg'
  },
  {
    id: 2,
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    multi: 'http://greper.veryreader.com/extends/avatar.jpg',
    aspectRatio: 'http://greper.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
