<script lang="ts" setup>
import { computed, defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  data: { type: Object as any, require: true },
})

const starBackground = ref('')
const starImage = ref('')
const weaponImage = computed(() => { return `/img/wish/weapons/${props.data.result.item_name}.png` })
const characterImage = computed(() => { return `/img/wish/characters/${props.data.result.item_name}.png` })

onMounted(() => {
  const bgType = ['ThreeBackground', 'FourBackground', 'FiveBackground']
  const starType = ['ThreeStar', 'FourStar', 'FiveStar']
  starBackground.value = `/img/wish/items/${bgType[props.data.star - 3]}.png`
  starImage.value = `/img/wish/items/${starType[props.data.star - 3]}.png`
})
</script>

<template>
  <div class="element">
    <img class="star-background" :src="starBackground" alt="ERROR" />
    <img class="star-image" :src="starImage" alt="ERROR" />
    <div v-if="data.result.item_type === '武器'">
      <img class="weapon-image" :src="weaponImage" alt="ERROR" />
      <p class="weapon-name">
        {{ data.result.item_name }}
      </p>
    </div>
    <div v-else>
      <img class="character-image" :src="characterImage" alt="ERROR" />
    </div>
    <div v-if="data.star !== 3" class="times">
      「{{ data.times }} 抽」
    </div>
  </div>
</template>

<style scoped>
.element .star-background {
    position: relative;
    width: 112px;
}

.element .star-image {
    display: flex;
    position: relative;
    z-index: 1;
    width: 82px;
    left: 15px;
    top: -202px;
}

.element .weapon-image {
    position: absolute;
    /* display: inline-block; */
    width: 112px;
    top: 208px;
}

.element .weapon-name {
    position: absolute;
    color: rgb(242, 242, 242);
    width: 112px;
    top: 434px;
    text-align: center;
    font-size: 15px;
}

.element .character-image {
    position: absolute;
    /* display: inline-block; */
    margin: 0 3px;
    width: 106px;
    bottom: 129px;
}

.times {
    position: absolute;
    z-index: 1;
    width: 80px;
    text-align: center;
    font-size: 15px;
    left: 16px;
    top: 25.5rem;
    color: rgb(255, 255, 255);
    background-color: rgba(5, 5, 5, 0.3);
}
</style>
