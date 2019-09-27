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
            timestamp: 123123123123,
            datetime: '2019-09-20 11:11:11',
            date: '2019-09-20 11:11:11',
            time: 12313123334,
            daterangeStart: '2019-09-20 11:11:11',
            daterangeEnd: '2019-09-21 11:11:11',
            datetimerangeStart: '2019-09-20 11:11:11',
            datetimerangeEnd: '2019-09-21 11:11:11'
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
