<script setup lang="ts">
import { reactive } from 'vue'

const prefetch = reactive({ data: [] as any })

prefetch.data.push('/video/4starwish.mp4')
prefetch.data.push('/video/5starwish.mp4')
prefetch.data.push('/video/5starwish-single.mp4')
prefetch.data.push('/video/4starwish-single.mp4')
prefetch.data.push('/video/3starwish-single.mp4')
</script>

<template>
  <div>
    <link
      v-for="(a, b) in prefetch.data"
      :key="String(b)"
      rel="prefetch"
      :href="a"
    />
  </div>
</template>
