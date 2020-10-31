import mock from './mock'
export default function requestForMock (options) {
  function getData () {
    for (const item of mock) {
      if (item.path === options.url) {
        return item.handle(options)
      }
    }
    return {
      code: 1,
      msg: '暂未实现'
    }
  }

  return new Promise((resolve, reject) => {
    return resolve(getData())
  })
}
