let idGenerator = 0
const list = [
  {
    id: ++idGenerator,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  },
  {
    id: ++idGenerator,
    avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
    image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
  }
]
const page = {
  records: list,
  total: 11,
  size: 20,
  current: 1
}
export default [
  {
    path: 'api/upload/page',
    method: 'get',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: page
      }
    }
  },
  {
    path: 'api/upload/add',
    method: 'post',
    handle (req) {
      console.log(req)
      req.body.id = ++idGenerator
      list.push(req.body)
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  },
  {
    path: 'api/upload/update',
    method: 'post',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  },
  {
    path: 'api/upload/delete',
    method: 'post',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: null
      }
    }
  }
]
