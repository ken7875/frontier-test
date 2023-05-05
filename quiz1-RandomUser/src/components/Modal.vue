<template lang="pug">
div(class="bg-[rgba(0,0,0,0.3)] w-full h-full fixed top-0 left-0 z-[100]" v-if="modalVisible" @click.stop.self.prevent="toggleModal(false)")
  div(class="relative bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[12px] p-[12px]" v-bind="$attrs")
    i(class="fa-solid fa-xmark absolute top-[3%] right-[3%] text-[1.5rem] cursor-pointer" @click="toggleModal(false)")
    div(class="my-[25px]")
        slot(name="title")
    div(class="overflow-x-hidden")
    slot(name="body")

</template>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { useModal } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import { nextTick, watch } from 'vue'

const modalStore = useModal()

const { toggleModal } = modalStore
const { modalVisible } = storeToRefs(modalStore)

let htmlDom: HTMLElement | null = null

watch(modalVisible, (val) => {
  nextTick(() => {
    if (val) {
      htmlDom = document.querySelector('html')
      htmlDom!.style.overflowY = 'hidden'
    } else {
      htmlDom!.style.overflowY = 'unset'
    }
  })
})
</script>
