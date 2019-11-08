export default {
  buildMock (options) {
    let name = options.name
    let list = options.list
    for (let item of list) {
      item.id = ++options.idGenerator
    }
    return [
      {
        path: 'api/' + name + '/page',
        method: 'get',
        handle (req) {
          return {
            code: 0,
            msg: 'success',
            data: {
              records: list,
              total: list.length,
              size: 20,
              current: list.length % 20 === 0 ? list.length / 20 : list.length / 20 + 1
            }
          }
        }
      },
      {
        path: 'api/' + name + '/add',
        method: 'post',
        handle (req) {
          req.body.id = ++options.idGenerator
          list.push(req.body)
          console.log('req', req, list)
          return {
            code: 0,
            msg: 'success',
            data: null
          }
        }
      },
      {
        path: 'api/' + name + '/update',
        method: 'post',
        handle (req) {
          for (let item of list) {
            if (item.id === req.body.id) {
              Object.assign(item, req.body)
              break
            }
          }
          console.log('req', req, list)
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
          for (let i = 0; i < list.length; i++) {
            let item = list[i]
            if ((item.id) === parseInt(req.params.id)) {
              console.log('remove i')
              list.splice(i, 1)
              break
            }
          }
          console.log('req', req, list)
          return {
            code: 0,
            msg: 'success',
            data: null
          }
        }
      }
    ]
  }
}
