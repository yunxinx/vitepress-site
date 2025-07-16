<template>
    <Layout>
        <template #layout-top>
            <NolebaseHighlightTargetedHeading />
        </template>
        <template #doc-before>
            <div style="padding-top: 20px" class="post-info" v-if="!frontmatter.page">
                {{ convertDateV2(frontmatter.date) }} &nbsp;&nbsp;
                <span v-for="item in frontmatter.tags"
                    ><a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span
                >
            </div>
        </template>
        <template #doc-bottom>
            <Comment />
        </template>
    </Layout>
    <Copyright />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import { withBase, useData } from 'vitepress'
import { convertDateV2 } from '../date'
import { useViewTransition } from '../useViewTransition'
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

// 使用视图过渡 Composable
useViewTransition()
</script>
