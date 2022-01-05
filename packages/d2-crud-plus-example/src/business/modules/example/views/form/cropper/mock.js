import mockUtil from '@/business/mock/base'

const options = {
  name: 'cropper',
  idGenerator: 0
}
const list = [
  {
    avatar: 'http://greper.docmirror.cn/extends/avatar.jpg',
    multi: ['http://greper.docmirror.cn/extends/avatar.jpg', 'https://www.baidu.com/img/bd_logo1.png'],
    aspectRatio: 'http://greper.docmirror.cn/extends/avatar.jpg'
  },
  {
    avatar: 'http://greper.docmirror.cn/extends/avatar.jpg',
    multi: 'http://greper.docmirror.cn/extends/avatar.jpg',
    aspectRatio: 'http://greper.docmirror.cn/extends/avatar.jpg'
  },
  {
    avatar: 'http://greper.docmirror.cn/extends/avatar.jpg',
    multi: 'http://greper.docmirror.cn/extends/avatar.jpg',
    aspectRatio: 'http://greper.docmirror.cn/extends/avatar.jpg'
  }
]
options.list = list
const mock = mockUtil.buildMock(options)
export default mock
