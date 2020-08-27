const { fs, path } = require('@vuepress/shared-utils')

module.exports = ctx => ({
  dest: 'docs',
  base:'/d2-crud-plus/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'd2-crud-plus',
      description: 'd2-crud-plus doc'
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
    //docsDir: '/d2-crud-plus-docs/docs',
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
          '/guide/': getGuideSidebar(),
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
      title: '指南',
      collapsable: false,
      sidebarDepth: 3,
      children: [
        '',
        'quickstart',
      ]
    },
    {
      title: '进阶',
      collapsable: false,
      sidebarDepth: 3,
      children: [
        'mixins',
        'options',
        'structure',
        'component',
        'column-type',
        'types',
        'slot',
        'extends',
        'dict',
        'event',
        'nest-data',
        'flat-data'
      ]
    },
    {
      title: '附加功能',
      collapsable: false,
      sidebarDepth: 3,
      children: [
        'permission',
        'generate'
      ]
    },
    {
      title: '更多帮助',
      collapsable: false,
      sidebarDepth: 0,
      children: [
        'upgrade',
        'breakingchange',
        'upgradechange',
        'questions',
        'contact'
      ]
    },
    // {
    //   title: 'd2-crud-x',
    //   collapsable: false,
    //   sidebarDepth: 3,
    //   children: [
    //     'd2crudx'
    //   ]
    // },
    {
      title: 'extends文档',
      collapsable: false,
      sidebarDepth: 0,
      children: extendsDocs
    },
    {
      title: '组件文档',
      collapsable: true,
      sidebarDepth: 0,
      children: componentDocs
    },
    {
      title: 'ChangeLog',
      collapsable: true,
      sidebarDepth: 0,
      children: [
        ['./changelogs/packages/d2-crud-x/CHANGELOG','d2-crud-x'],
        ['./changelogs/packages/d2-crud-plus/CHANGELOG','d2-crud-plus'],
        ['./changelogs/packages/d2-crud-plus-extends/CHANGELOG','d2-crud-plus-extends'],
        ['./changelogs/packages/d2-crud-plus-example/CHANGELOG','d2-crud-plus-example']
      ]
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
