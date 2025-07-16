import DefaultTheme from 'vitepress/theme'
import { useRoute, useData, type Theme } from 'vitepress'
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import 'viewerjs/dist/viewer.min.css'
import imageViewer from 'vitepress-plugin-image-viewer'
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue'
import codeblocksFold from 'vitepress-plugin-codeblocks-fold'
import 'vitepress-plugin-codeblocks-fold/style/index.css'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import Category from './components/Category.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/CommentGiscus.vue'

import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import './custom.css'
import './style/myfonts.css'
import './style/blur.css'
import './style/hidden.css'
import './style/vp-code.css'
import './style/vp-code-group.css'
import './style/viewTransition.css'

export default {
    ...DefaultTheme,
    Layout: NewLayout,
    enhanceApp({ app, router }) {
        // register global compoment
        app.component('Tags', Tags)
        app.component('Category', Category)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Comment', Comment)
        app.component('vImageViewer', vImageViewer)

        // 添加 NProgress 逻辑
        if (typeof window !== 'undefined') {
              NProgress.configure({ showSpinner: false })
              router.onBeforeRouteChange = () => {
                NProgress.start()
              }
              router.onAfterPageLoad = () => {
                 NProgress.done()
              }
        }
    },


    setup() {
        const route = useRoute();
        const { frontmatter } = useData();

        // 使用 vitepress-plugin-image-viewer
        imageViewer(route);

        // 使用 vitepress-plugin-codeblocks-fold
        // 参数说明：
        // - 第一个参数：包含 route 和 frontmatter 的对象
        // - 第二个参数：是否默认折叠所有代码块 (true: 默认折叠, false: 默认展开)
        // - 第三个参数：折叠后的高度 (单位: px)
        codeblocksFold({ route, frontmatter }, true, 400);
    }
} satisfies Theme
