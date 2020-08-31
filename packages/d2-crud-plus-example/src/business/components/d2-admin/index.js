const install = (Vue, options) => {
  Vue.component('d2-highlight', () => import('./d2-highlight'))
  Vue.component('d2-link-btn', () => import('./d2-link-btn'))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
