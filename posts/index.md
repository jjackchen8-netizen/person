---
title: 文章归档
aside: false
---

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from './posts.data.ts'

// 按年份分组
const groupedByYear = computed(() => {
  const groups = {}
  for (const post of posts) {
    const year = (post.date || '未知').slice(0, 4)
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
})

const formatDate = (date) => {
  if (!date) return ''
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}
</script>

# 文章归档

> 「写作是一场漫长的独白，也是与世界的悄悄对话。」

<div class="archive">
  <div v-if="!posts.length" class="empty">
    ✦ 还没有文章，敬请期待 ✦
  </div>

  <div v-for="[year, list] in groupedByYear" :key="year" class="year-group">
    <h2 class="year-title">{{ year }}</h2>
    <ul class="post-list">
      <li v-for="post in list" :key="post.url" class="post-item">
        <a :href="withBase(post.url)" class="post-link">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-title">{{ post.title }}</span>
          <span v-if="post.category" class="post-cat">— {{ post.category }}</span>
        </a>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.archive {
  margin-top: 2rem;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
  padding: 3rem 0;
}

.year-group {
  margin-bottom: 2.5rem;
}

.year-title {
  font-size: 1.5rem !important;
  font-weight: 500 !important;
  color: var(--vp-c-text-2);
  border-top: none !important;
  padding-top: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  letter-spacing: 0.05em;
  font-style: italic;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 0.6rem 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-link {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  text-decoration: none !important;
  border-bottom: none !important;
  color: var(--vp-c-text-1);
  transition: opacity 0.2s ease;
  flex-wrap: wrap;
}

.post-link:hover {
  opacity: 0.65;
}

.post-date {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  min-width: 3.5em;
}

.post-title {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  flex: 1;
}

.post-cat {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  font-style: italic;
}
</style>
