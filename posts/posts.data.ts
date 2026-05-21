/**
 * 文章数据 Loader
 * VitePress 在构建/开发时自动调用，把 posts/ 下所有 markdown 元数据汇总
 * 在归档页（posts/index.md）中通过 import 使用
 */
import { createContentLoader } from 'vitepress'

interface Post {
  url: string
  title: string
  date: string
  category: string
  description: string
}

declare const data: Post[]
export { data }

/**
 * 将 frontmatter 的 date 字段统一转成 YYYY-MM-DD 字符串
 * YAML 会把 2026-05-21 这种格式自动解析为 Date 对象
 */
function toDateString(value: unknown): string {
  if (!value) return ''
  if (value instanceof Date) {
    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, '0')
    const d = String(value.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return String(value)
}

export default createContentLoader('posts/**/*.md', {
  excerpt: false,
  transform(rawData): Post[] {
    return rawData
      // 排除归档页本身
      .filter((page) => page.url !== '/posts/' && !page.url.endsWith('/posts/index'))
      .map((page) => ({
        url: page.url,
        title: page.frontmatter.title || '',
        date: toDateString(page.frontmatter.date),
        category: page.frontmatter.category || '',
        description: page.frontmatter.description || ''
      }))
      // 按日期倒序
      .sort((a, b) => b.date.localeCompare(a.date))
  }
})
