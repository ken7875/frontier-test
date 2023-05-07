<template lang="pug">
section(class="px-[100px] py-[30px] bg-[#0F172A] w-full h-screen")
  h2(class="text-[1.5rem] text-white font-bold mb-[20px]") Nested Key-Value Pair Tree Viewer
  main(class="flex justify-between gap-[50px] flex-nowrap h-[90%]")
    article(class="border border-white w-[50%] px-[20px] pt-[15px]")
      button(class="h-[50px] bg-white mb-[20px] px-[15px] text-[1.2rem] float-right" @click="addNewPair") + Add new pair
      ul.w-full
        li.flex.w-full.justify-between.flex-nowrap.mb-5(v-for="pair in pairAry" :key="pair.name")
          input(class="w-[40%] h-[35px] px-[5px]" @input="($event) => editPair('key', $event.target.value, pair.id)")
          input(class="w-[40%] h-[35px] px-[5px]" @input="($event) => editPair('value', $event.target.value, pair.id)")
          button(class="w-[10%] h-[35px] bg-white") -
    article(class="border border-white w-[50%]")
      div(v-for="tree in pairAryToTreeViewer" :key="tree.id")
        p
          span(class="text-white") {{ tree.key }}:
          span(class="text-white")
            template(v-if="Object.keys(tree.child).length > 0")
              span(v-show="!tree.showChild" @click="tree.showChild = !tree.showChild") [ + ]
              span(v-show="tree.showChild" @click="tree.showChild = !tree.showChild") [ - ]
          span(class="text-white" v-show="Object.keys(tree.child).length === 0") {{ tree.value }}
        TreeItem(:treeData="tree.child" v-show="tree.showChild") /
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TreeItem from '@/components/TreeItem.vue'
import type { TreeData } from '@/model/tree'

interface Pair {
  key: string | number
  value: string | number
  id: number
}

const pairAry = ref<Pair[]>([])
const dataId = ref(0)

const addNewPair = () => {
  pairAry.value.push({
    key: '',
    value: '',
    id: dataId.value++
  })
}

const editPair = (type: 'key' | 'value', value: string | number, id: number) => {
  pairAry.value.forEach(pair => {
    if(pair.id === id) {
      pair[type] = value
    }
  })

  treeViewerHandler(pairAry.value)
}

const pairAryToTreeViewer = ref<Record<string, TreeData>>({})

const findChild = (pair: Pair) => {
  const pairKeyAry = pair.key.toString().split('.') // 將key名稱以.拆分
  const rootKey = pairKeyAry[0]

  let i = 0
  let level = 0

  const recursive = (childData: Record<string, TreeData>, level: number) => {
    
    if(i >= pairKeyAry.length - 1) { // 若超出key名稱數量，結束遞迴
      return
    }

    level++ // 計算此層為第幾層
    const nextKey = pairKeyAry[++i] // 取得下個key名稱

    if(!childData[nextKey]) { // 若為不重複的 key 在做新增，避免覆蓋舊有的值
      childData[nextKey] = {
        key: nextKey,
        value: pair.value,
        child: {},
        level,
        showChild: true
      }
    }

    recursive(childData[nextKey].child, level)
  }

  recursive(pairAryToTreeViewer.value[rootKey].child, 0) // 從最上層的子層開始跑遞迴
}

const treeViewerHandler = (pairAry: Pair[]) => {
  pairAryToTreeViewer.value = {}
  pairAry.forEach(pair => {
    const key = pair.key.toString().split('.')[0]
    if(!pairAryToTreeViewer.value[key]) {
      pairAryToTreeViewer.value[key] = {
        key: key,
        value: pair.value,
        child: {},
        level: 0,
        showChild: true
      }
    }

    if(pair.key.toString().includes('.')) {
      findChild(pair)
    }
  })
}
</script>