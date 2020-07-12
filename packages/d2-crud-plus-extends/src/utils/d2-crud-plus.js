let d2CrudPlus = null
try {
  d2CrudPlus = require('d2-crud-plus').d2CrudPlus
} catch (e) {
  console.error('d2CrudPlus未安装，某些功能不可用', e)
}
if (d2CrudPlus == null) {
  // 本地模拟一个, 使得脱离d2CrudPlus, extends里的组件也能够使用
  d2CrudPlus = {
    input: require('./input').default,
    inputBase: require('./input-base').default,
    util: {
      columnResolve: {
        addTypes () {}
      }
    }
  }
}

export {
  d2CrudPlus
}
