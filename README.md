# Vue 3 + TypeScript + Vite UI组件库

## 安装

```shell
npm i cun-ui
```

## 使用

引入css

```typescript
//main.ts
import 'cun-ui/style';
```

页面内使用

```typescript
<script setup lang="ts">
    import { CunButton, CunFlex } from 'cun-ui';
</script>
<template>
  <cun-flex direction="y" gap="20">
      <cun-flex warp x="start" gap="10">
          <cun-button size="medium" text="fill" type="fill" />
          <cun-button size="medium" text="light" type="light" />
          <cun-button size="medium" text="ghost" type="ghost" />
          <cun-button size="medium" text="text" type="text" />
      </cun-flex>
  </cun-flex>
</template>
```

## 组件文档地址

[maincheng/cun-ui (github.com)](https://github.com/maincheng/cun-ui)

clone项目地址：https://github.com/maincheng/cun-ui.git

运行项目：npm run dev

在浏览器中查看组件demo文档
