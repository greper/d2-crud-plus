const remoteDicts = new Map()

/**
 * 远程获取数据字典
 * @param dict 数据字典配置
 * @returns {Promise<any>|Promise<T | never>}
 */
function get (dict) {
  if (dict == null) {
    // 如果没有配置字典，直接返回空数组
    return new Promise((resolve) => {
      resolve([])
    })
  }
  let url = null
  let propMapping = null
  let dictData = null

  if (typeof (dict) === 'string') {
    url = dict
  } else {
    url = dict.url
    propMapping = dict.propMapping
    dictData = dict.data
  }
  if (dictData != null) {
    // 配置中就有字典数据，直接返回
    return new Promise((resolve) => {
      resolve(dictData)
    })
  }

  // 远程获取
  let item = remoteDicts.get(url)
  if (item == null || item.error === true) {
    // 还没加载过
    if (item == null) {
      item = { loading: true, callbacks: [] }
      remoteDicts.set(url, item)
    }

    item.loading = true
    item.error = false
    // 远程加载
    return this.getRemoteDictFunc(url).then((ret) => {
      // prop mapping
      if (propMapping != null) {
        for (let item of ret.data) {
          if (propMapping['value'] != null) item.value = item[propMapping['value']]
          if (propMapping['label'] != null) item.label = item[propMapping['label']]
        }
      }

      item.data = ret.data
      // 之前注册过的callback全部触发
      for (let callback of item.callbacks) {
        callback(item.data)
      }
      item.loading = false
      item.callbacks = []
      return ret.data
    }).catch(() => {
      item.loading = false
      item.error = true
    })
  } else if (item.loading === true) {
    // 正在加载中，注册callback，等加载完了之后，再统一触发，就只需要向服务器请求一次字典
    return new Promise((resolve) => {
      let callback = (data) => {
        resolve(data)
      }
      item.callbacks.push(callback)
    })
  } else {
    //  从缓存拿
    return new Promise((resolve) => {
      resolve(item.data)
    })
  }
}

/**
 * 将数据字典从远程获取然后设置到目标属性中去
 * @param obj
 * @param prop
 * @param dictOptions
 * @param propMapping
 */
function set (obj, prop, dictOptions, propMapping) {
  if (dictOptions.url != null) {
    obj[prop] = []
    dict.get(dictOptions.url).then((ret) => {
      obj[prop].splice(0, obj[prop].length)
      for (let opt of ret) {
        if (propMapping != null) {
          if (propMapping['value'] != null) opt.value = opt[propMapping['value']]
          if (propMapping['label'] != null) opt.label = opt[propMapping['label']]
        }
        obj[prop].push(opt)
      }
      console.log('dictUrl Update:', obj[prop])
    })
  } else {
    obj[prop] = dictOptions.data
  }
  console.log('dictUrl:', obj[prop])
}

function clear (url) {
  console.log('dict clear:', url)
  if (url == null) {
    remoteDicts.clear()
  } else {
    remoteDicts.delete(url)
  }
}
const dict = {
  get,
  set,
  clear,
  getRemoteDictFunc: () => {
    console.error('请在install d2-crud-plus时传入 options={getRemoteDictData:function}')
  }
}

export default dict
