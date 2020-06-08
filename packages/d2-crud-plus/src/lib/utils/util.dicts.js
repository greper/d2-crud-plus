const cache = new Map()

/**
 * 远程获取数据字典
 * @param dict 数据字典配置
 * @returns {Promise<T>}
 */
function get (dict) {
  if (dict == null) {
    // 如果没有配置字典，直接返回空数组
    dict = {}
  }

  let url = dict.url
  let dictData = dict.data
  this.mergeDefault(dict)
  if (dictData != null) {
    // 配置中就有字典数据，直接返回
    return new Promise((resolve) => {
      let dataMap = getDataMap(dict, dictData)
      onReady(dict, { data: dictData, dataMap: dataMap })
      resolve(dictData)
    })
  }
  if (url == null && dict.getData == null) {
    return new Promise((resolve) => {
      onReady(dict, { data: [], dataMap: {} })
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
    if (url == null || typeof url === 'string') {
      let getRemoteDictFunc = this.getRemoteDictFunc
      if (dict.getData != null) {
        getRemoteDictFunc = dict.getData
      }
      promise = getRemoteDictFunc(url, dict)
    } else {
      if (url instanceof Promise) {
        promise = url
      } else {
        promise = url(dict)
      }
    }

    return promise.then((ret) => {
      // prop mapping
      let data = ret.data
      if (data == null) {
        data = ret
      }
      item.data = data
      item.dataMap = getDataMap(dict, data)
      onReady(dict, item)
      // 之前注册过的callback全部触发
      for (let callback of item.callbacks) {
        callback(item)
      }
      item.loading = false
      item.callbacks = []
      return data
    }).catch((err) => {
      console.log(err)
      item.loading = false
      item.error = true
    })
  } else if (item.loading === true) {
    // 正在加载中，注册callback，等加载完了之后，再统一触发，就只需要向服务器请求一次字典
    return new Promise((resolve) => {
      let callback = (item) => {
        onReady(dict, item)
        resolve(item.data)
      }
      item.callbacks.push(callback)
    })
  } else {
    //  从缓存拿
    onReady(dict, item)
    return new Promise((resolve) => {
      resolve(item.data)
    })
  }
}
function putAll (dict, map, list) {
  let valueName = dict.value
  let childrenName = dict.children
  for (let item of list) {
    map[item[valueName]] = item
    if (dict.isTree && item[childrenName] != null) {
      putAll(dict, map, item[childrenName])
    }
  }
}
function getDataMap (dict, data) {
  let dataMap = {}
  putAll(dict, dataMap, data)
  return dataMap
}

function onReady (dict, item) {
  dict.data = item.data
  dict.dataMap = item.dataMap
  if (dict.onReady != null) {
    setTimeout(() => {
      dict.onReady(dict.data, dict)
    }, 1)
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
  data: undefined,
  dataMap: undefined
}
function mergeDefault (dict) {
  if (dict == null) {
    throw new Error('dict 不能为空')
  }
  for (let key in defaultDict) {
    if (key === 'data') {
      continue
    }
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
