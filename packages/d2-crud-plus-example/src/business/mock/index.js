import { mock } from '@/api/service'
import * as tools from '@/api/tools'

const req = context => context.keys().map(context)
const apiList1 = req(require.context('./api/', true, /\.js$/))
  .filter(e => e.default)
  .map(e => e.default)

// 模拟数据
const apiList = req(require.context('../modules/', true, /mock\.js$/))
  .filter(e => e.default)
  .map(e => e.default)

apiList.push(...apiList1)

apiList.forEach(apiFile => {
  for (const item of apiFile) {
    mock
      .onAny(item.path)
      .reply(config => {
        console.log('------------fake request start -------------')
        console.log('request:', config)
        const req = {
          body: JSON.parse(config.data),
          params: JSON.parse(config.data)
        }
        const ret = item.handle(req)
        console.log('response:', ret)
        console.log('------------fake request end-------------')
        if (ret.code === 0) {
          return tools.responseSuccess(ret.data, ret.msg)
        } else {
          return tools.responseError(ret.data, ret.msg, ret.code)
        }
      })
  }
})
