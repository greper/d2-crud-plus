import exampleRouters from './example/routers'
export default {
  /**
   * 在主框架内显示
   */
  frameIn: [
    ...exampleRouters.frameIn
  ],
  /**
   * 在主框架之外显示
   */
  frameOut: [],

  /**
   * 错误页面
   */
  errorPage: []
}
