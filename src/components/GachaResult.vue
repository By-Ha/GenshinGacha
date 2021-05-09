<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  gachaList: { type: Object as any, require: true },
})
</script>

<template>
  <div>
    <div class="background">
      <img src="http://adachi-bot.oss-cn-beijing.aliyuncs.com/gacha/items/background.png" alt="ERROR" />
    </div>
    <GachaResultBox :data="gachaList"></GachaResultBox>
  </div>
</template>

<style scoped>
.background {
    position: absolute;
}

.background > img{
    min-width: 100vw;
    min-height: 100vh;
}
</style>
