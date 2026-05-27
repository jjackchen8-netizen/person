#!/bin/bash
# ============================================================
# format-news.sh
# 将 Horizon 生成的新闻摘要转换为 VitePress 博客文章格式
# ============================================================

set -euo pipefail

SUMMARY_DIR="${1:-.horizon-tmp/data/summaries}"
OUTPUT_DIR="${2:-posts/news}"
DATE=$(date +%Y-%m-%d)
FILENAME="${OUTPUT_DIR}/${DATE}-daily.md"

# 查找最新的摘要文件
LATEST_SUMMARY=$(find "$SUMMARY_DIR" -name "*.md" -type f 2>/dev/null | sort -r | head -1)

if [ -z "$LATEST_SUMMARY" ]; then
  echo "⚠️ 未找到 Horizon 生成的摘要文件，跳过。"
  exit 0
fi

echo "📰 找到摘要文件: $LATEST_SUMMARY"

# 确保输出目录存在
mkdir -p "$OUTPUT_DIR"

# 读取摘要内容（去掉可能存在的原始标题行）
CONTENT=$(sed '1{/^# /d;}' "$LATEST_SUMMARY")

# 生成带 frontmatter 的博客文章
cat > "$FILENAME" << EOF
---
title: 每日新闻速递 · ${DATE}
date: ${DATE}
category: 新闻日报
tags:
  - 新闻
  - AI日报
description: ${DATE} 科技新闻速递，由 Horizon AI 自动抓取、评分与生成。
---

# 每日新闻速递 · ${DATE}

> 本日报由 [Horizon](https://github.com/Thysrael/Horizon) 自动生成，每日定时更新。

${CONTENT}

---

*本文由 AI 自动生成，仅供参考。*
EOF

echo "✅ 已生成博客文章: $FILENAME"
