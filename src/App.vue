<script setup lang="ts">
import { useHead } from '@vueuse/head'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Genshin Gacha',
  meta: [
    { name: 'description', content: '原神抽卡模拟' },
  ],
})
</script>

<template>
  <router-view />
</template>
