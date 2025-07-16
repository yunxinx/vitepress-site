---
page: true
description: 我的网站的首页，在这里展示的是我网站的文章列表
aside: false
comment: false
lastUpdated: false
---
<script setup>
import Page from "./.vitepress/theme/components/Page.vue";
import { useData } from "vitepress";
const { theme } = useData();
const posts = theme.value.posts.slice(0,10)
</script>
<Page :posts="posts" :pageCurrent="1" :pagesNum="1" />