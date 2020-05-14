import mockUtil from '../../../../../mock/base'

let options = {
  name: 'editor',
  idGenerator: 0
}
const list = [
  {
    title: 'd2-crud-plus好用吗？',
    content: '非常好用'
  },
  {
    title: 'd2-crud-plus有什么优势？',
    content: '简单，方便'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
