const install = (Vue, options) => {
  Vue.component('d2-highlight', () => import('./d2-highlight'))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
