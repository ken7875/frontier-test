<template lang="pug">
ul.flex
  template(v-if="totalPageLength <= 6")
    li(:class="['border border-black w-[35px] h-[35px] flex justify-center items-center', { 'bg-[#D1EFEC] text-white': curPage === page }]" v-for="page in totalPageLength" :key="page" @click="$emit('update:curPage', page)")
      span {{ page }}
  template(v-else)
    li(:class="['border border-black w-[35px] h-[35px] flex justify-center items-center', { 'bg-[#D1EFEC] text-white': curPage === 1 }]" @click="$emit('update:curPage', 1)") {{ 1 }}
    li(v-if="curPage >= 5") ...
    li(:class="['border border-black w-[35px] h-[35px] flex justify-center items-center', { 'bg-[#D1EFEC] text-white': curPage === page }]" v-for="page in slicePageLengthCounter" :key="page" @click="$emit('update:curPage', page)")
      span {{ page }}
    li(v-if="curPage <= totalPageLength - 4") ...
    li(:class="['border border-black w-[35px] h-[35px] flex justify-center items-center', { 'bg-[#D1EFEC] text-white': curPage === totalPageLength }]" @click="$emit('update:curPage', totalPageLength)") {{ totalPageLength }}
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

interface Props {
  totalDataLen: number
  curPage: number
  eachPageTotal: number
}
const props = defineProps<Props>()
const { totalDataLen, curPage, eachPageTotal } = toRefs(props)

const totalPageLength = computed(() => Math.ceil(totalDataLen.value / eachPageTotal.value))

const slicePageLengthCounter = computed(() => {
  const pageAry = [2, 3, 4, 5, 6]

  // 防止數字超過
  if (curPage.value - 2 <= 2) {
    return pageAry
  } else if (curPage.value + 2 >= totalPageLength.value - 1) {
    for (let i = 5; i > 0; i--) {
      pageAry[pageAry.length - i] = totalPageLength.value - i
    }

    return pageAry
  }

  for (let i = 0; i < 5; i++) {
    pageAry[i] = curPage.value + (i - 2)
    console.log(curPage.value + (i - 2), i)
  }

  return pageAry
})
</script>
