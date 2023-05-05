<template lang="pug">
div(class="px-[30px] my-[50px] relative h-screen")
  UserModal(:userData="checkUser") /
  div(class="animate-rotate absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" v-if="isLoading")
    svg(class="animate-spin h-[50px] w-[50px] mr-3" viewBox="0 0 24 24" fill="none")
      circle(class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4")
      path(class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")
  nav.flex.justify-between.items-center.mb-5(v-else)
    ul(class="flex")
      li(:class="['underline decoration-2 text-[1.2rem] mr-[10px] cursor-pointer', curCategory === category ? 'text-[#948Af8]' : 'text-[#CEBCFB]']  " v-for="(category, i) in categoryAry" @click="curCategory = category") {{ category }}
    div(class="flex items-center gap-[8px]")
      BaseSelect(v-model="perPageDataNum" :options="dataNumAry" class="w-[150px] h-[40px]")
      ul(class="flex gap-[8px]")
        li(class="rounded-[8px] border p-[8px] h-[40px]" @click="showType = 'card'") 卡片
        li(class="rounded-[8px] border p-[8px] h-[40px]" @click="showType = 'list'") 選單
  .w-full.flex
  ul(class=" flex flex-wrap gap-[15px]")
    li(v-for="(user, i) in currentPageData" :class="['mb-[15px] cursor-pointer', showType === 'card' ? 'w-[calc(20%-12px)]' : 'w-full']" @click="openUserModal(user)")
      Card.w-full.h-full
        template(#title)
          .flex.items-center
            img(:src="user.picture.thumbnail" class="w-[50px] h-[50px] rounded-[50%] mr-[10px]")
            p {{ user.name.last }} {{ user.name.first }}
        template(#body)
          ul
            li.flex
              p(class="mr-[15px]") 生日:
              p(v-timeFormat="user.dob.date")
            li.flex
              p(class="mr-[15px]") 年齡:
              p {{ user.dob.age }}
            li.flex
              p(class="mr-[15px]") 國籍:
              p {{ user.nat }}
            li.flex
              p(class="mr-[15px]") 電話:
              p {{ user.phone }}
          div(class="relative px-2 h-[45px]")
            i(class="fa-regular fa-heart absolute top-[50%] translate-y-[-50%] right-[2%] text-[35px]" @click="setFavorite('add', user.login.uuid)" v-show="favorData.indexOf(user.login.uuid) <= -1")
            i(class="fa-solid fa-heart absolute top-[50%] translate-y-[-50%] right-[2%] text-[35px]" @click="setFavorite('remove', user.login.uuid)" v-show="favorData.indexOf(user.login.uuid) > -1")
  Pagination(:totalDataLen="renderData.length" v-model:curPage="curPage" :eachPageTotal="perPageDataNum" class="mt-[30px] w-fit mx-auto") /
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, ref, watch, type Ref } from 'vue'
import Card from '@/components/Card.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import Pagination from '@/components/Pagination.vue'
import UserModal from '@/components/UserModal.vue'
import { useModal } from '@/stores/modal'
import { storeToRefs } from 'pinia'
import type { UserData } from '@/model/user'
const userData = ref<UserData[]>([])

const isLoading = ref(false)
const errorText = ref('')

const getUserData = async () => {
  isLoading.value = true

  try {
    const resData = await axios.get(
      'https://randomuser.me/api?results=3010&inc=name,gender,nat,phone,picture,dob,id,login&seed=c88ad84fc97e6094'
    )
    userData.value = resData.data.results
    if (userData.value.length <= 0) {
      errorText.value = '查無資料'
    }
  } catch (error) {
    console.log(error)
    errorText.value = '查無資料'
  } finally {
    isLoading.value = false
  }
}

getUserData()

// 最愛
const favorData = ref<string[]>([])
favorData.value = localStorage.getItem('favorData') ? JSON.parse(localStorage.getItem('favorData')!) : []
const setFavorite = (type: 'add' | 'remove', id: string) => {
  type === 'add' ? favorData.value.push(id) : favorData.value.splice(favorData.value.indexOf(id), 1)
  localStorage.setItem('favorData', JSON.stringify(favorData.value))
}

// 篩選類別功能
const categoryAry = ref(['ALL', 'Favorite'])
const curCategory = ref(localStorage.getItem('category') || 'ALL')

const renderData = computed(() => {
  localStorage.setItem('category', curCategory.value)

  let data: UserData[] = []

  switch (curCategory.value) {
    case 'ALL':
      data = userData.value
      break
    case 'Favorite':
      userData.value.forEach((user) => {
        favorData.value.forEach((favorId) => {
          if (user.login.uuid === favorId) {
            data.push(user)
          }
        })
      })
  }

  return data
})

// 資料筆數
const dataNumAry = ref([10, 30, 50])
const perPageDataNum = ref(Number(localStorage.getItem('perPageDataNum')) || 30)
watch(perPageDataNum, (val) => {
  localStorage.setItem('perPageDataNum', val.toString())
  perPageDataNum.value = val * 1
})

const curPage = ref(Number(localStorage.getItem('userListPage')) || 1)

const currentPageData = computed(() => {
  localStorage.setItem('userListPage', curPage.value.toString())
  const head = (curPage.value - 1) * perPageDataNum.value
  const tail = perPageDataNum.value + head

  return renderData.value.slice(head, tail)
})

// 當前頁數資料為0跳回前一頁
watch(currentPageData, (val) => {
  if (val.length <= 0 && curPage.value > 1) {
    curPage.value -= 1
  }
})

// 資料呈現狀態
const showType = ref<string>(localStorage.getItem('pageShowType') || 'card')

watch(showType, (val) => {
  localStorage.setItem('pageShowType', val)
})

// 開啟modal
const modalStore = useModal()

const { toggleModal } = modalStore

const checkUser = ref<UserData | null>(null) as Ref<UserData>

const openUserModal = (user: UserData) => {
  if (!user) {
    return
  }

  toggleModal(true)
  checkUser.value = user
}
</script>
