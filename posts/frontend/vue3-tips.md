---
title: Vue3 开发小技巧
date: 2026-05-21
category: 前端
tags:
  - Vue3
  - 前端
description: 一些在日常 Vue3 开发中常用的小技巧记录。
---

# Vue3 开发小技巧

> 工具是手指的延伸，熟练的人无需思考。

## 一、使用 `defineModel` 简化双向绑定

Vue 3.4+ 提供了 `defineModel` 宏，让组件双向绑定更加简洁：

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

## 二、`ref` 与 `reactive` 的选择

- 基本类型：用 `ref`
- 对象 / 数组：两者皆可，但推荐 `ref` 保持一致性
- 需要解构保持响应：使用 `toRefs`

## 三、组合式函数（Composables）

把可复用的有状态逻辑提取为 `useXxx`：

```ts
// useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  return { count, increment }
}
```

## 四、善用 `<script setup>`

- 自动暴露顶层绑定
- 更好的 TS 推断
- 编译期优化

---

> 写代码如写诗——节奏、留白、克制都是修养。
