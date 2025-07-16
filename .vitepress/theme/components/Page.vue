<template>
    <div v-for="(article, index) in posts" :key="index" class="post-list">
        <div class="post-header">
            <div class="post-title">
                {{ article.frontMatter.order > 0 ? '📌' : '' }}
                <a :href="withBase(article.regularPath)"> {{ article.frontMatter.title }}</a>
            </div>
        </div>
        <p class="describe" v-html="article.frontMatter.description"></p>
        <div class='post-info'>
            <div class="post-meta-left">
                {{ article.frontMatter.date }} <span v-for="item in article.frontMatter.tags"><a :href="withBase(`/pages/tags.html?tag=${item}`)"> {{ item }}</a></span>
            </div>
            <div class="post-meta-right">
                最后更新于: {{ formatLastUpdated(article.lastUpdated) }}
            </div>
        </div>
    </div>

    <div class="pagination" v-if="pagesNum > 1">
        <span v-for="(item, index) in pageArray" :key="index" :class="['link', { active: item === pageCurrent }]">
            <template v-if="item === '...'"> ... </template>
            <template v-else-if="item === pageCurrent">
                {{ item }}
            </template>
            <template v-else>
                <a :href="withBase(item === 1 ? '/index.html' : `/page_${item}.html`)">
                    {{ item }}
                </a>
            </template>
        </span>
    </div>
</template>

<script lang="ts" setup>

import { withBase } from 'vitepress'
import { PropType, computed } from 'vue'
import { generatePaginationArray } from '../pagination'
import { formatLastUpdated } from '../date'
interface Article {
    regularPath: string
    frontMatter: {
        order: number
        title: string
        description: string
        date: string
        tags: string[]
    }
    lastUpdated: number
}
const props = defineProps({
    posts: {
        type: Array as PropType<Article[]>,
        required: true
    },
    pageCurrent: {
        type: Number as PropType<number>,
        required: true
    },
    pagesNum: {
        type: Number as PropType<number>,
        required: true
    }
})

const pageArray = computed(() => {
    return generatePaginationArray(props.pagesNum, props.pageCurrent)
})
</script>

<style scoped>
.post-list {
    border-bottom: 1px dashed var(--vp-c-divider);
    padding: 14px 0 14px 0;
}
.post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post-title {
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--bt-theme-title)!important;
    margin: 0.1rem 0;
}
.post-title a{
    color: var(--bt-theme-title)!important;
}

.describe {
    font-size: 0.9375rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
    color: var(--vp-c-text-2);
    margin: 10px 0;
    line-height: 1.5rem;
}

.post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 12px;
}

.post-meta-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.post-meta-right {
    font-size: 12px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
}

.post-info span {
    display: inline-block;
    padding: 0 8px;
    background-color: var(--vp-c-bg-alt);
    margin-right: 10px;
    transition: 0.4s;
    border-radius: 2px;
    color: var(--vp-c-text-1);
}

.pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
}
.link {
    display: inline-block;
    width: 26px;
    text-align: center;
    border: 1px var(--vp-c-divider) solid;
    border-right: none;
    font-weight: 400;
    border-radius: 20px;
}
.link.active {
    background: var(--vp-c-text-1);
    color: var(--vp-c-neutral-inverse);
    border: 1px solid var(--vp-c-text-1) !important;
}

@media screen and (max-width: 768px) {
    .post-list {
        padding: 14px 0 14px 0;
    }
    .post-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post-title {
        font-size: 1.0625rem;
        font-weight: 400;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        width: 17rem;
    }
    .describe {
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        overflow: hidden;
        margin: 0.5rem 0 1rem;
    }

    .post-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    .post-meta-right {
        font-size: 11px;
    }
}
</style>
