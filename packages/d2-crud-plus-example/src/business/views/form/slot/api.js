import request from '@/plugin/axios'

export function GetList (query) {
  return new Promise(resolve => {
    resolve({
      code: 1,
      msg: '',
      data: {
        current: 1,
        total: 4,
        size: 10,
        records: [
          {
            createDate: new Date().getTime() - 900000,
            updateDate: new Date().getTime() - 10000,
            slotExample: '可以愉快的写filter啦'
          },
          {
            createDate: new Date().getTime() - 800000,
            updateDate: new Date().getTime() - 20000,
            slotExample: '可以愉快的写filter啦'
          },
          {
            createDate: new Date().getTime() - 70000,
            updateDate: new Date().getTime() - 30000,
            slotExample: '可以愉快的写filter啦'
          },
          {
            createDate: new Date().getTime() - 9990000,
            updateDate: new Date().getTime() - 40000,
            slotExample: '可以愉快的写filter啦'
          }
        ]
      }
    })
  })
}

export function AddObj (obj) {
  return request({
    url: '/test/add',
    method: 'post',
    data: obj
  })
}

export function UpdateObj (obj) {
  return request({
    url: '/test/update',
    method: 'post',
    data: obj
  })
}
export function DelObj (id) {
  return request({
    url: '/test/delete',
    method: 'post',
    params: { id }
  })
}
