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
          span(class="text-white") {{ tree.key }}
          span(class="text-white") {{ tree.value }}
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Pair {
  key: string | number
  value: string | number
  id: number
}

type treeData = { key: string | number, value: string | number, child: Record<string, treeData> }

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

const pairAryToTreeViewer = ref<Record<string, treeData>>({})

const findChild = (pair: Pair) => {
  let splitKey =  pair.key.toString().split('.')
  console.log(splitKey, 'splitKey')
  for(let i = 0; i < splitKey.length - 1; i++) {
    const parent = splitKey[i]
    const child = splitKey[i + 1]

    pairAryToTreeViewer.value[parent].child[child] = {
      key: child,
      value: '',
      child: {}
    }
  }
  // while(pairKey.indexOf('.') > -1) {
  //   console.log(pairKey, 'pairKey')
    
  // }
}

const treeViewerHandler = (pairAry: Pair[]) => {
  pairAryToTreeViewer.value = {}
  pairAry.forEach(pair => {
    const key = pair.key.toString().split('.')[0]
    pairAryToTreeViewer.value[key] = {
      key: key,
      value: pair.value,
      child: {}
    }
    if(pair.key.toString().includes('.')) {
      findChild(pair)
    }
  })
}

// if(pair.key.toString().includes('.')) {
//       findChild(pair)
//     } else {
//       console.log(pair.key)
//       pairAryToTreeViewer.value[pair.key] = {
//         key: pair.key,
//         value: pair.value,
//         child: {}
//       }
//     }
</script>