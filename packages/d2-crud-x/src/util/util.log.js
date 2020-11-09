let debug = () => {}
function getCallerInfo () {
  const e = new Error()
  return e.stack.split('\n')[3]
}
if (process.env.NODE_ENV !== 'production') {
  if (process.env.VUE_APP_D2P_LOG_DEBUG === 'true') {
    debug = (...args) => {
      const callerInfo = getCallerInfo()
      if (process.env.VUE_APP_D2P_LOG_WITH_CALLER === 'true') {
        console.log('[debug]', ...args, '\n', callerInfo)
      } else {
        console.log('[debug]', ...args)
      }
    }
  }
}

export default {
  debug
}
