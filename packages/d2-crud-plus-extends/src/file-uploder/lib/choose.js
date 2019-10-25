import cos from './uploader/cos'
import alioss from './uploader/alioss'
import qiniu from './uploader/qiniu'
let map = {
  cos: cos,
  alioss: alioss,
  qiniu: qiniu
}
export default {
  get (type) {
    return map[type]
  }
}
