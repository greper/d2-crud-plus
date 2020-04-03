import d2Highlight from './d2-highlight'

const install = (Vue, options) => {
  Vue.component(d2Highlight.name, d2Highlight)
  Vue.component('d2-icon-select', () => import('./d2-icon-select/index.vue'))
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const components = [
  d2Highlight
]

export default { install, ...components }
