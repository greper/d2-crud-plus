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
            status: '0',
            mselect: 'sz',
            cascader: ['zhinan', 'shejiyuanze', 'yizhi']
          },
          {
            status: '1',
            mselect: 'sh,sz',
            slotExample: 'slotExample'
          },
          {
            status: '1',
            mselect: 'gz',
            slotExample: 'slotExample'
          },
          {
            date: '2016-05-03',
            status: '2',
            mselect: 'wh,gz',
            slotExample: 'slotExample'
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
