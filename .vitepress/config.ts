import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'chen 的博客',
  description: '记录技术、生活与思考',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'chen' }],
    ['meta', { name: 'keywords', content: 'chen, 博客, 前端, Vue, 技术' }]
  ],

  themeConfig: {
    siteTitle: 'chen',
    logo: '/avatar.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '项目', link: '/projects' },
      { text: '关于', link: '/about' },
      { text: '友链', link: '/links' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '前端',
          collapsed: false,
          items: [
            { text: 'Vue3 开发小技巧', link: '/posts/frontend/vue3-tips' }
          ]
        },
        {
          text: '生活随笔',
          collapsed: false,
          items: [
            { text: '你好，世界', link: '/posts/life/hello-world' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jjackchen8-netizen' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 chen'
    },

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdatedText: '最后更新于',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章'
          },
          modal: {
            noResultsText: '无相关结果',
            resetButtonTitle: '清除',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
