import d2CrudPlus from './install'
import './styles/d2-crud-plus.scss'
import log from './utils/util.log'
if (Promise && !Promise.prototype.finally) {
  log.debug('shim finally')
  // eslint-disable-next-line no-extend-native
  Promise.prototype.finally = {
    finally (fn) {
      const onFinally = callback => Promise.resolve(fn()).then(callback)
      return this.then(
        result => onFinally(() => result),
        reason => onFinally(() => Promise.reject(reason))
      )
    }
  }
}

export { d2CrudPlus }
