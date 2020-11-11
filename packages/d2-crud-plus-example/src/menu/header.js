// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '文档',
    icon: 'file-text-o',
    path: 'doc',
    children: [
      { path: 'http://d2-crud-plus.docmirror.cn/d2-crud-plus/', title: 'd2-crud-plus', icon: 'file-text-o' },
      { path: 'http://d2-crud-plus.docmirror.cn/d2-crud-plus/d2-crud-x', title: 'd2-crud-x', icon: 'file-text-o' },
      { path: 'http://www.veryreader.com:9080/reports/mochawesome.html', title: '测试报告', icon: 'file-text-o' }
    ]
  }
]
