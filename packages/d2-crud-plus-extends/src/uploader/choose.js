export default {
  get (type) {
    const uploader = () => import('./lib/' + type)
    return uploader().then(ret => {
      return ret.default
    })
  }
}
