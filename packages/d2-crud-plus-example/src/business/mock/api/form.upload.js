
export default [
  {
    path: '/test/add',
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
    path: '/test/update',
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
    path: '/test/delete',
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
