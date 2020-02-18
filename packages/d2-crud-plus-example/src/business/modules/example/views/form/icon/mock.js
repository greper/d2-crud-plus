import mockUtil from '../../../../../mock/base'

let options = {
  name: 'icon',
  idGenerator: 0
}
const list = [
  {
    iconSelect: 'check',
    iconSelect2: 'check'
  }
]
options.list = list
let mock = mockUtil.buildMock(options)
export default mock
