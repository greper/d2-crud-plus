// eslint-disable-next-line no-extend-native
Promise.prototype.finally = Promise.prototype.finally || {
  finally (fn) {
    const onFinally = value => Promise.resolve(fn()).then(() => value)
    return this.then(
      result => onFinally(result),
      reason => onFinally(Promise.reject(reason))
    )
  }
}.finally
