<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  data: { type: Object as any, require: true },
})

</script>

<template>
  <div class="gacha">
    <div v-for="(data, index) in data" :key="String(index)" class="gacha-box">
      <GachaResultResult
        :data="data"
      ></GachaResultResult>
    </div>
  </div>
</template>

<style scoped>
.gacha-box {
    position: relative;
    display: inline-flex;
    top: 24px;
}
</style>
