<template lang="pug">
Modal(class="w-[50%] h-[80%] px-[30px]") /
  template(#title)
    h2(class="text-[1.8rem]") 用戶資訊
  template(#body)
    img(:src="userData.picture.medium" class="w-[100px] h-[100px] rounded-[50%] mx-auto")
    p(class="text-center text-[1.2rem] font-bold my-[10px]") {{ userData.name.last }} {{ userData.name.first }}
    ul(class="flex flex-col justify-around h-[55%]")
      li(class="flex justify-between items-center")
        p 生日:
        p(v-timeFormat="userData.dob.date")
      li(class="flex justify-between items-center")
        p 年齡:
        p {{ userData.dob.date }}
      li(class="flex justify-between items-center")
        p 國籍:
        p {{ userData.dob.date }}
      li(class="flex justify-between items-center")
        p 電話:
        p {{ userData.dob.date }}
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import type { UserData } from '@/model/user'

interface Props {
  userData: UserData
}
const props = defineProps<Props>()
</script>
