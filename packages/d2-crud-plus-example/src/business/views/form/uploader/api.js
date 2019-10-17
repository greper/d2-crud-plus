import request from '@/plugin/axios'

export function GetList (query) {
  return new Promise(resolve => {
    resolve({
      code: 1,
      msg: '',
      data: {
        current: 1,
        total: 2,
        size: 10,
        records: [
          {
            avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
            file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
            image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
          },
          {
            avatar: 'http://qiniu.veryreader.com/extends/avatar.jpg',
            file: 'http://qiniu.veryreader.com/extends/avatar.jpg',
            image: 'http://qiniu.veryreader.com/extends/avatar.jpg'
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

export function GetUploadUrl (key, type, filename) {
  return request({
    url: '/api/test/getUploadUrl',
    method: 'get',
    params: { key, type, filename }
  })
}
