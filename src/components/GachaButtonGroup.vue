<script setup lang="ts">
import { ref, inject, reactive } from 'vue'
import Button from './Button.vue'
import { gachaOnce, gachaTenimes } from '~/utils/gacha'

const disAbleGachaBtn = ref(false)
const gacha_result = inject('gacha', reactive({ data: [] as any }))

function check() {
  if (localStorage.getItem('gacha') === null || localStorage.getItem('zh2en') === null) return false
  else return true
}

function once() {
  if (disAbleGachaBtn.value || !check()) return
  disAbleGachaBtn.value = true
  gacha_result.data = gacha_result.data.concat(gachaOnce(301))
  disAbleGachaBtn.value = false
}
function tenTimes() {
  if (disAbleGachaBtn.value || !check()) return
  disAbleGachaBtn.value = true
  gacha_result.data = gacha_result.data.concat(gachaTenimes(301))
  disAbleGachaBtn.value = false
}
</script>

<template>
  <div class="flex flex-row">
    <div class="flex flex-col mr-auto">
      <div class="flex">
        <div class="flex flex-row">
          <img src="/img/item/Item_Masterless_Starglitter.webp" class="h-6" />
          <p
            class="ml-2 font-genshin text-hex-EEEEEE"
            style="text-shadow: 0 0 2px black"
          >
            0
          </p>
        </div>
        <div class="flex flex-row ml-4">
          <img src="/img/item/Item_Masterless_Stardust.webp" class="h-6" />
          <p
            class="ml-2 font-genshin text-hex-EEEEEE"
            style="text-shadow: 0 0 2px black"
          >
            0
          </p>
        </div>
      </div>
      <div class="mt-2">
        <Button>尘辉兑换</Button>
        <Button>详情</Button>
        <Button>历史记录</Button>
      </div>
    </div>
    <div class="float-right mt-auto flex-row flex">
      <div
        class="bg-gachabtn w-55 h-13.25 bg-contain bg-center bg-no-repeat cursor-pointer"
        @click="once()"
      >
        <p class="font-genshin mt-2 text-sm text-hex-B5A6A0">
          祈愿1次
        </p>
        <div class="w-100% flex flex-row justify-center -mt-1">
          <img src="/img/item/Item_Intertwined_Fate.webp" class="h-6 w-6" />
          <p class="font-genshin text-hex-B5A6A0">
            x 1
          </p>
        </div>
      </div>
      <div
        class="bg-gachabtn w-55 h-13.25 bg-contain bg-center bg-no-repeat cursor-pointer"
        @click="tenTimes()"
      >
        <p class="font-genshin mt-2 text-sm text-hex-B5A6A0">
          祈愿10次
        </p>
        <div class="w-100% flex flex-row justify-center -mt-1">
          <img src="/img/item/Item_Intertwined_Fate.webp" class="h-6 w-6" />
          <p class="font-genshin text-hex-B5A6A0">
            x 10
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
