import lodash from 'lodash'
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
  const dictData = dict.data
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
      if (ret == null) {
        console.warn('获取的远程数据字典为空，请检查后台返回,', url)
      }
      // prop mapping
      let data = ret.data
      if (data == null) {
        data = ret
      }
      if (!(data instanceof Array)) {
        console.warn('获取到的字典类型不是数组：', ret)
      }

      item.data = data
      item.dataMap = getDataMap(dict, data)

      const result = onReady(dict, item, options)
      // 之前注册过的callback全部触发
      for (const callback of item.callbacks) {
        callback(item)
      }
      item.loading = false
      item.callbacks = []
      return result
    }).catch((err) => {
      console.log(err, dict)
      item.loading = false
      item.error = true
    })
  } else if (item.loading === true) {
    // 正在加载中，注册callback，等加载完了之后，再统一触发，就只需要向服务器请求一次字典
    return new Promise((resolve) => {
      const callback = (item) => {
        resolve(onReady(dict, item, options))
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
  const valueName = dict.value
  const childrenName = dict.children
  for (const item of list) {
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
  const dataMap = {}
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
  const ret = buildResult(dict, item, options)
  if (dict.onReady != null) {
    dict.onReady(ret, dict, options)
  }
  return ret
}

/**
 * 构建返回结果
 * @param data
 * @param dataMap
 * @param options
 * @returns {*}
 */
function buildResult (dict, { data, dataMap }, options) {
  let ret = null
  if (options && options.returnType === 'dataMap') {
    ret = dataMap
  } else {
    ret = data
  }
  if (dict && dict.clone === true) {
    ret = lodash.cloneDeep(ret)
  }
  return ret
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
    resolve(onReady(dict, item, options))
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
function mergeDefault (dict, clone = false) {
  if (dict == null) {
    throw new Error('dict 不能为空')
  }
  if (clone) {
    dict = { ...dict }
  }
  for (const key in defaultDict) {
    if (key === 'data') {
      continue
    }
    if (dict[key] == null) {
      dict[key] = defaultDict[key]
    }
  }
  return dict
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
  for (const item of data) {
    if (item[dict.value] === value) {
      return item
    }
    if (dict.isTree && item[dict.children] != null) {
      const target = getByValue(value, item[dict.children], dict)
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
