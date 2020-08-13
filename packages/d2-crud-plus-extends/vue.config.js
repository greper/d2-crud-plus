module.exports = {
  lintOnSave: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'd2-crud-plus': 'd2CrudPlus',
      lodash: 'lodash'
    }
  }
}
