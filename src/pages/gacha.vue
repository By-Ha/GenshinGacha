<script setup lang="ts">
import { provide, reactive } from 'vue'
import axios from 'axios'

const gacha_result = reactive({ data: [] })

provide('gacha', gacha_result)

axios.get('/config/character/zh-cn.json').then((r) => {
  axios.get('/config/weapon/zh-cn.json').then((m) => {
    axios.get('/config/default/zh-cn.json').then((n) => {
      localStorage.setItem('gacha', JSON.stringify({ 200: n.data, 301: r.data, 302: m.data }))
    })
  })
})

axios.get('/config/zh2en.json').then((res) => {
  localStorage.setItem('zh2en', JSON.stringify(res.data))
})

axios.get('/config/characterInfo.json').then((res) => {
  localStorage.setItem('characterInfo', JSON.stringify(res.data))
})

axios.get('/config/weaponInfo.json').then((res) => {
  localStorage.setItem('weaponInfo', JSON.stringify(res.data))
})

</script>

<template>
  <div class="w-80vw mx-auto my-0 p-8">
    <Prefetch />
    <GachaItemAnimation />
    <video src="/video/background.mp4" autoplay loop class="fixed left-0 top-0 min-h-100vh w-100% object-cover object-left-top -z-1"></video>
    <div class="flex justify-center flex-col">
      <GachaHeader></GachaHeader>
      <GachaBanner src="/img/CharacterWish.jpg" class="mb-4"></GachaBanner>
      <GachaButtonGroup />
      <!-- <p class="font-genshin text-black">
        开发中画面，请以实际上线后为准。
      </p> -->
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: gacha
</route>
