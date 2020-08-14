// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '文档',
    icon: 'file-text-o',
    path: 'doc',
    children: [
      { path: 'https://greper.github.io/d2-crud-plus/', title: 'GitHub Pages', icon: 'file-text-o' },
      { path: 'http://greper.gitee.io/d2-crud-plus/', title: '码云（国内速度快）', icon: 'file-text-o' }
    ]
  }
]
