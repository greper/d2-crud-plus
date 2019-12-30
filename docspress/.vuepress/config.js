const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  dest: 'docs',
  base:'/d2-crud-plus/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'd2-crud-plus',
      description: 'd2-crud-plus'
    },
  },
  head: [
    ['link', { rel: 'icon', href: `/icon-only.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  // theme: '@vuepress/vue',
  themeConfig: {
    repo: 'greper/d2-crud-plus',
    editLinks: true,
    docsDir: '/docs',
    // #697 Provided by the official algolia team.
    // algolia: ctx.isProd ? ({
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // }) : null,
    smoothScroll: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
         // '/api/': getApiSidebar(),
          '/guide/': getGuideSidebar('指南', '进阶','字段类型配置'),
         // '/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
         // '/theme/': getThemeSidebar('主题', '介绍')
        }
      },
    }
  },
  // plugins: [
  //   ['@vuepress/back-to-top', true],
  //   ['@vuepress/pwa', {
  //     serviceWorker: true,
  //     updatePopup: true
  //   }],
  //   ['@vuepress/medium-zoom', true],
  //   // ['@vuepress/google-analytics', {
  //   //   ga: 'UA-128189152-1'
  //   // }],
  //   ['container', {
  //     type: 'vue',
  //     before: '<pre class="vue-container"><code>',
  //     after: '</code></pre>'
  //   }],
  //   ['container', {
  //     type: 'upgrade',
  //     before: info => `<UpgradePath title="${info}">`,
  //     after: '</UpgradePath>'
  //   }],
  //   ['flowchart']
  // ],
  extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js'
  ]
})

// function getApiSidebar () {
//   return [
//     'cli',
//     'node'
//   ]
// }

const componentDocs = fs
  .readdirSync(path.resolve(__dirname, '../guide/components'))
  .map(filename => '/guide/components/' + filename.slice(0, -3))
  .sort()
const extendsDocs = fs
  .readdirSync(path.resolve(__dirname, '../guide/extends'))
  .map(filename => '/guide/extends/' + filename.slice(0, -3))
  .sort()
console.log('----------------')
console.log(componentDocs)
console.log('----------------')
function getGuideSidebar (groupA, groupB,groupC) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 3,
      children: [
        '',
        'quickstart',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      sidebarDepth: 3,
      children: [
        'options',
        'column-type',
        'dict',
        'extends'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      sidebarDepth: 3,
      children: [
        'types',
        'types-code'
      ]
    },
    {
      title: 'd2p-extends',
      collapsable: false,
      sidebarDepth: 3,
      children: extendsDocs
    },
    {
      title: '组件文档',
      collapsable: false,
      sidebarDepth: 3,
      children: componentDocs
    }
  ]
}


//
// function getPluginSidebar (pluginTitle, pluginIntro, officialPluginTitle) {
//   return [
//     {
//       title: pluginTitle,
//       collapsable: false,
//       children: [
//         ['', pluginIntro],
//         'using-a-plugin',
//         'writing-a-plugin',
//         'life-cycle',
//         'option-api',
//         'context-api'
//       ]
//     },
//     {
//       title: officialPluginTitle,
//       collapsable: false,
//       children: officalPlugins
//     }
//   ]
// }
//
// function getThemeSidebar (groupA, introductionA) {
//   return [
//     {
//       title: groupA,
//       collapsable: false,
//       sidebarDepth: 2,
//       children: [
//         ['', introductionA],
//         'using-a-theme',
//         'writing-a-theme',
//         'option-api',
//         'default-theme-config',
//         'inheritance'
//       ]
//     }
//   ]
// }
