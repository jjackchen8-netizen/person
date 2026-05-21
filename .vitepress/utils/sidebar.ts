/**
 * 自动扫描 posts/ 目录生成 VitePress 侧边栏配置
 * 新增文章只需放进对应分类目录，无需手动维护 sidebar
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.resolve(__dirname, '../../posts')

/**
 * 分类目录英文 → 中文显示名映射
 * 新增分类时在这里登记一下中文名（不登记则原样显示）
 */
const CATEGORY_LABELS: Record<string, string> = {
  frontend: '前端',
  backend: '后端',
  life: '生活随笔',
  reading: '读书',
  thoughts: '思考',
  tools: '工具'
}

/**
 * 分类排序权重（数字越小越靠前）
 */
const CATEGORY_ORDER: Record<string, number> = {
  frontend: 1,
  backend: 2,
  tools: 3,
  reading: 4,
  thoughts: 5,
  life: 6
}

interface PostMeta {
  title: string
  date: string
  link: string
}

/**
 * 极简 frontmatter 解析（仅支持 key: value 单行字段）
 * 足够提取 title / date / category
 */
function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (key && value) data[key] = value
  }
  return data
}

/**
 * 按分类读取所有文章
 */
function readPostsByCategory(): Map<string, PostMeta[]> {
  const result = new Map<string, PostMeta[]>()
  if (!fs.existsSync(POSTS_DIR)) return result

  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const categoryDir = path.join(POSTS_DIR, entry.name)
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'))

    const posts: PostMeta[] = files.map((file) => {
      const filepath = path.join(categoryDir, file)
      const content = fs.readFileSync(filepath, 'utf-8')
      const meta = parseFrontmatter(content)
      const slug = file.replace(/\.md$/, '')
      return {
        title: meta.title || slug,
        date: meta.date || '',
        link: `/posts/${entry.name}/${slug}`
      }
    })

    // 同分类内按日期倒序
    posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    result.set(entry.name, posts)
  }

  return result
}

/**
 * 生成 VitePress 侧边栏配置
 */
export function generateSidebar() {
  const postsByCategory = readPostsByCategory()
  const categories = Array.from(postsByCategory.keys()).sort((a, b) => {
    const oa = CATEGORY_ORDER[a] ?? 99
    const ob = CATEGORY_ORDER[b] ?? 99
    return oa - ob
  })

  return categories.map((category) => ({
    text: CATEGORY_LABELS[category] || category,
    collapsed: false,
    items: (postsByCategory.get(category) || []).map((p) => ({
      text: p.title,
      link: p.link
    }))
  }))
}
