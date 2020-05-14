export default {
  get (type) {
    return require('./uploader/' + type).default
    // return map[type]
  }
}
