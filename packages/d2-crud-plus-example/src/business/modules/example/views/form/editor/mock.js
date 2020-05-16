import mockUtil from '../../../../../mock/base'

let options = {
  name: 'editor',
  idGenerator: 0
}
const list = [
  {
    title: 'd2-crud-plus好用吗？',
    text: '非常好用',
    content: '<h1 class="ql-align-center">非常好用哦</h1>'
  },
  {
    title: 'd2-crud-plus有什么优势？',
    text: '简单，方便',
    content: '简单方便'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
