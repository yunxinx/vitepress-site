import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

//每页的文章数量
const pageSize = 10

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    title: '观书望海',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'Some notes',
    ignoreDeadLinks: true,
    lang: 'zh-CN',

    // Sitemap 配置
    sitemap: {
        hostname: 'https://134257.xyz'
    },
    head: [
      ['link', {
          rel: 'icon', href: 'https://www.helloimg.com/i/2024/10/19/67134f8f7b473.ico'
      }],
      ['link', {
          rel: 'preconnect', href: 'https://fontsapi.zeoseven.com'
      }],
      ['script', {
          defer: '',
          src: 'https://umami.134257.xyz/script.js',
          'data-website-id': '0b44f00c-5e60-407c-bb46-cc0640a469a6'
      }]
    ],

    themeConfig: {
        posts: await getPosts(pageSize),
        logo: 'https://redocs.s3.bitiful.net/siteLogo.svg',
        website: 'https://134257.xyz', //copyright link
        // 评论的仓库地址 https://giscus.app/ 请按照这个官方初始化后覆盖
        comment: {
            repo: 'yunxinx/write',
            repoId: 'R_kgDOM8-yYQ',
            categoryId: 'DIC_kwDOM8-yYc4Cq2Zr'
        },
        nav: [
            { text: '主 页', link: '/' },
            { text: '分 类', link: '/pages/category' },
            { text: '归 档', link: '/pages/archives' },
            { text: '标 签', link: '/pages/tags' },
            { text: '关 于', link: '/pages/about' }
            // { text: 'Airene', link: 'http://airene.net' }  -- External link test
        ],

        //outline:[2,3],
        outline: {
            label: '大纲',
            level: [2, 4]
        },
        returnToTopLabel: "回到顶部",
        sidebarMenuLabel: "菜单",
        darkModeSwitchLabel: "主题",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",

        //上次更新时间 //
        lastUpdated: {
          text: '最后编辑于',
          formatOptions: {
            dateStyle: 'short', // 可选值full、long、medium、short
            timeStyle: 'short' // 可选值full、long、medium、short
          }
        }
        // socialLinks: [{ icon: 'github', link: 'https://github.com/airene/vitepress-blog-pure' }]
    } as any,

    srcExclude: isProd
        ? [
              '**/trash/**/*.md', // 排除所有 trash 目录
              '**/draft/**/*.md', // 递归排除子目录
              '**/private-notes/*.md', // 排除特定文件
              'README.md'
          ]
        : ['README.md'],
    vite: {
        //build: { minify: false }
        server: { port: 5000 },
        plugins: [
          MermaidPlugin(),
          pagefindPlugin({
            btnPlaceholder: '搜索',
            placeholder: '搜索文档',
            emptyText: '空空如也',
            heading: '共: {{searchResult}} 条结果',
            toSelect: '选择',
            toNavigate: '导航',
            toClose: '关闭',
            searchBy: '搜索驱动:',
            customSearchQuery: chineseSearchOptimize,
            excludeSelector: ['img', 'a.header-anchor'],
            forceLanguage: 'zh-cn'
          })
        ],
        optimizeDeps: {
          include: ['mermaid']
        },
        ssr: {
          noExternal: [
            'mermaid',
            '@nolebase/vitepress-plugin-highlight-targeted-heading'
        ]
        }
    },

    markdown: {
      config(md) {
        md.use(MermaidMarkdown);
      },
      image: {
        lazyLoading: true
      }
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
