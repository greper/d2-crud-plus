const cache = new Map()

/**
 * 远程获取数据字典
 * @param dict 数据字典配置
 * @returns {Promise<T>}
 */
function get (dict, options) {
  if (dict == null) {
    // 如果没有配置字典，直接返回空数组
    return buildResultPromise(dict, { data: undefined, dataMap: undefined }, options)
  }

  let url = dict.url
  let dictData = dict.data
  this.mergeDefault(dict)
  if (dictData != null) {
    // 配置中就有字典数据，直接返回
    if (dict && !dict.dataMap) {
      dict.dataMap = getDataMap(dict, dictData)
    }
    return buildResultPromise(dict, { data: dictData, dataMap: dict.dataMap }, options)
  }

  if (url && url instanceof Function) {
    url = url(dict, options)
    if (url instanceof Promise) {
      console.warn('新版本已不支持url()返回字典数据，url()应该返回一个字典请求url')
    }
  }

  if (url == null && dict.getData == null) {
    return buildResultPromise(dict, { data: [], dataMap: {} }, options)
  }

  let cacheKey = url
  if (dict.cache === false || cacheKey instanceof Function) {
    cacheKey = null
  }
  if (cacheKey) {
    cacheKey = cacheKey + '_' + dict.value
  }
  // 远程获取
  let item = cacheKey != null ? cache.get(cacheKey) : null
  if (item == null || item.error === true) {
    // 还没加载过
    if (item == null) {
      item = { loading: true, callbacks: [] }
      if (cacheKey != null) {
        cache.set(cacheKey, item)
      }
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
      promise = getRemoteDictFunc(url, dict, options)
    } else {
      if (url instanceof Promise) {
        promise = url
      } else {
        promise = url(dict, options)
      }
    }
    // 处理远程结果
    return promise.then((ret) => {
      // prop mapping
      let data = ret.data
      if (data == null) {
        data = ret
      }

      item.data = data
      item.dataMap = getDataMap(dict, data)

      onReady(dict, item, options)
      // 之前注册过的callback全部触发
      for (let callback of item.callbacks) {
        callback(item)
      }
      item.loading = false
      item.callbacks = []
      return buildResult(item, options)
    }).catch((err) => {
      console.log(err, dict)
      item.loading = false
      item.error = true
    })
  } else if (item.loading === true) {
    // 正在加载中，注册callback，等加载完了之后，再统一触发，就只需要向服务器请求一次字典
    return new Promise((resolve) => {
      let callback = (item) => {
        onReady(dict, item, options)
        resolve(buildResult(item, options))
      }
      item.callbacks.push(callback)
    })
  } else {
    //  已经加载过，从缓存拿
    return buildResultPromise(dict, item, options)
  }
}

/**
 * 构建dataMap的递归方法
 * @param dict
 * @param map
 * @param list
 */
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

/**
 * 构建dataMap
 * @param dict
 * @param data
 * @returns {{}}
 */
function getDataMap (dict, data) {
  let dataMap = {}
  putAll(dict, dataMap, data)
  return dataMap
}

/**
 * 触发dict的onReady事件
 * @param dict
 * @param item
 */
function onReady (dict, item, options) {
  if (dict && typeof dict.url === 'string') {
    dict.data = item.data
    dict.dataMap = item.dataMap
  }
  if (dict.onReady != null) {
    setTimeout(() => {
      dict.onReady(dict.data, dict, options)
    }, 1)
  }
}

/**
 * 构建返回结果
 * @param data
 * @param dataMap
 * @param options
 * @returns {*}
 */
function buildResult ({ data, dataMap }, options) {
  if (options && options.returnType === 'dataMap') {
    return dataMap
  }
  return data
}

/**
 * 构建返回Promise
 * @param dict
 * @param item
 * @param options
 * @returns {Promise<unknown>}
 */
function buildResultPromise (dict, item, options) {
  return new Promise((resolve) => {
    onReady(dict, item, options)
    resolve(buildResult(item, options))
  })
}

/**
 * 清空字典缓存
 * @param url
 */
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
  if (key != null) {
    return cache.get(key)
  }
  return cache
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
  getRemoteDictFunc,
  mergeDefault
}

export default dict
