
export default [
  {
    path: 'api/test/add',
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
    path: 'api/test/update',
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
    path: 'api/test/delete',
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
