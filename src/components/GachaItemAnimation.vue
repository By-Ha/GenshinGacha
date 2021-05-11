<script setup lang="ts">
import { reactive, inject, watchEffect } from 'vue'

const config = reactive({
  cards: [{} as any],
  animate: true,
  videoEnd: false,
  videoSrc: '',
  showResult: false,
  result: [] as any,
  clear: 0,
})
const gacha_result = inject('gacha', reactive({ data: [] as any }))
const characterInfo = JSON.parse(
  localStorage.getItem('characterInfo') as string,
)
const weaponInfo = JSON.parse(localStorage.getItem('weaponInfo') as string)
const prefetch = reactive({ data: [] as any })

config.cards = []

function next() {
  if (config.clear === 1) {
    while (config.cards.length) config.cards.shift()
    config.animate = true
    config.showResult = true
    config.clear = 0
    return
  }
  if (config.animate || config.cards.length === 0) return
  config.cards.shift()
  config.animate = true
  if (config.cards.length === 0) config.showResult = true
}

watchEffect(() => {
  const draws = gacha_result.data.length
  const raw = localStorage.getItem('zh2en')
  config.result = []

  config.videoEnd = false
  let maxStar = 3
  if (raw === null) return
  const zh2en = JSON.parse(raw)
  while (gacha_result.data.length) {
    const data = gacha_result.data.shift() as any
    maxStar = Math.max(maxStar, data.star)
    config.result.push(data)

    config.cards.push({
      name: data.result.item_name,
      id: zh2en[data.result.item_name]
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('\'', ''),
      star: data.star,
      type: data.result.item_type === '角色' ? 'character' : 'weapon',
      decoration:
        data.result.item_type === '角色'
          ? `/element/${characterInfo[data.result.item_name]}.webp`
          : `/weapon/${weaponInfo[data.result.item_name]}.webp`,
    })

    if (
      !prefetch.data.includes(
        `/img/${
          data.result.item_type === '角色' ? 'character' : 'weapon'
        }/${zh2en[data.result.item_name]
          .toLowerCase()
          .replaceAll(' ', '-')
          .replaceAll('\'', '')}.png`,
      )
    ) {
      prefetch.data.push(
        `/img/${
          data.result.item_type === '角色' ? 'character' : 'weapon'
        }/${zh2en[data.result.item_name]
          .toLowerCase()
          .replaceAll(' ', '-')
          .replaceAll('\'', '')}.png`,
      )
    }
  }
  config.videoSrc = `/video/${maxStar}starwish${
    draws === 1 ? '-single' : ''
  }.mp4`
  config.result.sort((x: any, y: any) => {
    if (x.star === y.star) {
      if (x.up === y.up) return y.result.item_id - x.result.item_id
      else return y.up - x.up
    }
    return y.star - x.star
  })
})
</script>

<template>
  <div
    v-if="config.cards.length != 0 || config.showResult"
    class="fixed left-0 top-0 min-h-100vh w-100vw bg-gacha2"
    @click="next"
    @dragstart="next"
  >
    <div
      class="fixed left-0 top-0 min-h-100vh w-100vw animated"
      :class="{ animate__shine: config.animate }"
    ></div>
    <link
      v-for="(a, b) in prefetch.data"
      :key="String(b)"
      rel="prefetch"
      :href="a"
    />
    <video
      v-if="config.videoEnd === false"
      :src="config.videoSrc"
      autoplay
      @ended="config.videoEnd = true"
      @click="config.videoEnd = true"
    ></video>
    <div
      v-if="config.cards.length != 0 && config.videoEnd"
      class="flex items-center min-h-100vh w-100vw"
    >
      <p
        class="fixed top-3 right-5 font-genshin underline cursor-pointer"
        @click="config.clear = 1"
      >
        跳过→
      </p>
      <div
        class="font-genshin text-5xl absolute ml-15vw animated"
        :class="{ animate__textIn: config.animate }"
      >
        <img
          :src="'/img/decoration/' + config['cards'][0].decoration"
          class="absolute -z-1 -ml-9 -mt-3"
        />
        <p>
          {{ config['cards'][0].name }}
        </p>
      </div>
      <img
        class="animated mx-auto t-center"
        :src="`/img/${config.cards[0].type}/${config['cards'][0].id}.png`"
        :class="{
          animate__zoomIn: config.animate,
          'w-1/5': config.cards[0].type == 'weapon',
          'w-1/1': config.cards[0].type == 'character',
        }"
        @animationend="config.animate = false"
      />
    </div>
    <GachaResult
      v-if="config.showResult"
      :gacha-list="config.result"
      class="h-100vh"
      @click="config.showResult = false"
    ></GachaResult>
  </div>
</template>
