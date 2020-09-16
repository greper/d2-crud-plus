import router from '@/router'
const isBaiduTraceEnabled = process.env.VUE_APP_BAIDU_TRACE === 'true'

router.afterEach(async (to, from, next) => {
  // 百度分析
  if (isBaiduTraceEnabled && to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
})
