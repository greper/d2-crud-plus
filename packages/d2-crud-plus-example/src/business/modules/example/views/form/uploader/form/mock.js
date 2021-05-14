import mockUtil from '@/business/mock/base'

const options = {
  name: 'upload/form',
  idGenerator: 0
}
const list = [
  {
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    file: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    image: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    image2: ['http://greper.veryreader.com/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png']
  },
  {
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    file: 'http://greper.veryreader.com/extends/avatar.jpg',
    image: 'http://greper.veryreader.com/extends/avatar.jpg'
  },
  {
    avatar: 'http://greper.veryreader.com/extends/avatar.jpg',
    file: { url: 'http://greper.veryreader.com/extends/avatar.jpg' },
    image: 'http://greper.veryreader.com/extends/avatar.jpg'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
