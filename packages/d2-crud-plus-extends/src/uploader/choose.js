export default {
  get (type) {
    return require('./lib/' + type).default
    // return map[type]
  }
}
