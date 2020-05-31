const cache = new Map()

/**
 * 远程获取数据字典
 * @param dict 数据字典配置
 * @returns {Promise<T>}
 */
function get (dict) {
  if (dict == null) {
    // 如果没有配置字典，直接返回空数组
    console.error('没有配置数据字典，返回空数组')
    return new Promise((resolve) => {
      resolve([])
    })
  }

  let url = null
  let dictData = null

  if (typeof (dict) === 'string') {
    url = dict
    dict = { url }
  } else {
    this.mergeDefault(dict)
    url = dict.url
    dictData = dict.data
  }
  if (dictData != null) {
    // 配置中就有字典数据，直接返回
    return new Promise((resolve) => {
      resolve(dictData)
    })
  }
  if (url == null && dict.getData == null) {
    return new Promise((resolve) => {
      resolve([])
    })
  }
  let cacheKey = url
  if (url == null) {
    cacheKey = dict.getData
  }
  // 远程获取
  let item = cache.get(cacheKey)
  if (item == null || item.error === true) {
    // 还没加载过
    if (item == null) {
      item = { loading: true, callbacks: [] }
      cache.set(cacheKey, item)
    }

    item.loading = true
    item.error = false
    // 远程加载
    let promise = null
    if (url != null && typeof url !== 'string') {
      promise = url(dict)
    } else {
      let getRemoteDictFunc = this.getRemoteDictFunc
      if (dict.getData != null) {
        getRemoteDictFunc = dict.getData
      }
      promise = getRemoteDictFunc(url, dict)
    }

    return promise.then((ret) => {
      // prop mapping
      let data = ret.data
      if (data == null) {
        data = ret
      }
      item.data = data
      dict.data = data
      // 之前注册过的callback全部触发
      for (let callback of item.callbacks) {
        callback(item.data)
      }
      item.loading = false
      item.callbacks = []
      return data
    }).catch(() => {
      item.loading = false
      item.error = true
    })
  } else if (item.loading === true) {
    // 正在加载中，注册callback，等加载完了之后，再统一触发，就只需要向服务器请求一次字典
    return new Promise((resolve) => {
      let callback = (data) => {
        dict.data = data
        resolve(data)
      }
      item.callbacks.push(callback)
    })
  } else {
    //  从缓存拿
    dict.data = item.data
    return new Promise((resolve) => {
      resolve(item.data)
    })
  }
}

function clear (url) {
  console.log('dict clear:', url)
  if (url == null) {
    cache.clear()
  } else {
    cache.delete(url)
  }
}
function getRemoteDictFunc (url) {
  console.error('请在install d2-crud-plus时传入 options={getRemoteDictFunc:()->{ http 请求获取枚举字典 }}')
  return new Promise()
}
const defaultDict = {
  value: 'value',
  label: 'label',
  color: 'color',
  children: 'children',
  isTree: false,
  data: undefined
}
function mergeDefault (dict) {
  if (dict == null) {
    throw new Error('dict 不能为空')
  }
  for (let key in defaultDict) {
    if (dict[key] == null) {
      dict[key] = defaultDict[key]
    }
  }
}
function getCache (key) {
  return cache.get(key)
}
function putCache (key, value) {
  console.log('set cache:', key)
  return cache.set(key, value)
}
function getByValue (value, data, dict) {
  for (let item of data) {
    if (item[dict.value] === value) {
      return item
    }
    if (dict.isTree && item[dict.children] != null) {
      let target = getByValue(value, item[dict.children], dict)
      if (target != null) {
        return target
      }
    }
  }
  return null
}

const dict = {
  get,
  getByValue,
  clear,
  getCache,
  putCache,
  mergeDefault,
  getRemoteDictFunc
}

export default dict
