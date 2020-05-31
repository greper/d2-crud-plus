function copyList (originList, newList, options) {
  for (let item of originList) {
    let newItem = { ...item }
    newItem.id = ++options.idGenerator
    newList.push(newItem)
    if (item.children != null) {
      newItem.children = []
      copyList(item.children, newItem.children, options)
    }
  }
}
export default {
  buildMock (options) {
    let name = options.name
    if (options.copyTimes == null) {
      options.copyTimes = 30
    }
    let list = []
    for (let i = 0; i < options.copyTimes; i++) {
      copyList(options.list, list, options)
    }
    return [
      {
        path: 'api/' + name + '/page',
        method: 'get',
        handle (req) {
          let data = list
          let size = 20
          let current = 1
          if (req != null && req.body != null) {
            if (req.body.size != null) {
              size = parseInt(req.body.size)
            }
            if (req.body.current != null) {
              current = parseInt(req.body.current)
            }
            const query = { ...req.body }
            delete query.current
            delete query.size
            if (Object.keys(query).length > 0) {
              data = list.filter(item => {
                for (let key in query) {
                  let value = query[key]
                  if (value == null) {
                    continue
                  }
                  if (value instanceof Array) {
                    if (value.length === 0) {
                      continue
                    }
                    let found = false
                    for (let i of value) {
                      if (item[key] instanceof Array) {
                        for (let j of item[key]) {
                          if (i === j) {
                            found = true
                            break
                          }
                        }
                      } else {
                        if (item[key] === i) {
                          found = true
                          break
                        }
                      }
                    }
                    return found
                  }
                  if (item[key] !== value) {
                    return false
                  }
                }
                return true
              })
            }
          }

          let start = size * (current - 1)
          let end = size * current
          if (data.length < end) {
            end = data.length
          }
          let records = data.slice(start, end)
          const maxPage = data.length % size === 0 ? data.length / size : Math.floor(data.length / size) + 1
          if (current > maxPage) {
            current = maxPage
          } else if (current < 1) {
            current = 1
          }
          return {
            code: 0,
            msg: 'success',
            data: {
              records: records,
              total: data.length,
              size: size,
              current: current
            }
          }
        }
      },
      {
        path: 'api/' + name + '/get',
        method: 'get',
        handle (req) {
          let id = req.params.id
          id = parseInt(id)
          console.log('req', req, id, list)
          let current = null
          for (let item of list) {
            if (item.id === id) {
              current = item
              break
            }
          }
          return {
            code: 0,
            msg: 'success',
            data: current
          }
        }
      },
      {
        path: 'api/' + name + '/add',
        method: 'post',
        handle (req) {
          req.body.id = ++options.idGenerator
          list.unshift(req.body)
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
        path: 'api/' + name + '/delete',
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
      },
      {
        path: 'api/' + name + '/batchDelete',
        method: 'post',
        handle (req) {
          console.log('req', req, list)
          let ids = req.body.ids
          for (let i = list.length - 1; i >= 0; i--) {
            let item = list[i]
            if (ids.indexOf(item.id) >= 0) {
              list.splice(i, 1)
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
