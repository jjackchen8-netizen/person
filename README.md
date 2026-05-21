# chen 的博客

> 记录代码、文字与生活的微光。

基于 [VitePress](https://vitepress.dev/) 构建的个人静态博客，极简文艺风。

## 技术栈

- **框架**：VitePress 1.x
- **语言**：Vue3 + TypeScript
- **构建**：Vite
- **部署**：Vercel / GitHub Pages

## 目录结构

```
person/
├── .vitepress/
│   ├── config.ts          # 站点配置（导航、侧边栏、SEO）
│   └── theme/
│       ├── index.ts       # 主题入口
│       └── style.css      # 极简文艺风样式
├── posts/                 # 博客文章
│   ├── frontend/          # 前端分类
│   └── life/              # 生活随笔
├── public/                # 静态资源
│   └── avatar.svg
├── index.md               # 首页
├── about.md               # 关于
├── projects.md            # 项目
├── links.md               # 友链
├── package.json
└── README.md
```

## 本地开发

```bash
# 安装依赖（推荐 pnpm）
pnpm install

# 启动开发服务器
pnpm dev

# 构建静态文件
pnpm build

# 本地预览构建结果
pnpm preview
```

## 写作指南

在 `posts/<分类>/` 下新建 Markdown 文件即可：

```markdown
---
title: 文章标题
date: 2026-05-21
category: 分类
tags:
  - 标签1
description: 一句话摘要
---

# 文章标题

正文内容……
```

新增文章后，记得在 `.vitepress/config.ts` 的 `sidebar` 中添加对应链接。

## 部署

### Vercel（推荐）

1. 推送到 GitHub
2. 在 Vercel 导入仓库
3. 构建命令：`pnpm build`
4. 输出目录：`.vitepress/dist`

### GitHub Pages

参考 [VitePress 部署文档](https://vitepress.dev/guide/deploy#github-pages)。

## License

MIT © chen
