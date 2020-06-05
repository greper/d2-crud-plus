import mockUtil from '../../../../../mock/base'

let options = {
  name: 'upload',
  idGenerator: 0
}
const list = [
  {
    id: 1,
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    file: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    image: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    image2: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png']
  },
  {
    id: 2,
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    file: 'http://greper.veryreader.com/extends/avatar.jpg',
    image: 'http://greper.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
