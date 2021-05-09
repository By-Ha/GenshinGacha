<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  src: {
    type: String,
    require: true,
  },
})
</script>

<template>
  <div class="flex justify-center flex-col h-65vh">
    <div class="flex justify-center">
      <img :src="src" class="rounded-5px object-contain h-65vh">
    </div>
  </div>
</template>
