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
            slotExample: 'slotExample1'
          },
          {
            slotExample: 'slotExample2'
          },
          {
            slotExample: 'slotExample3'
          },
          {
            slotExample: 'slotExample4'
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
