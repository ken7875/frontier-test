<template lang="pug">
ul(v-if="hasChild")
  li(v-for="(tree) in treeData" :key="tree.key")
    p(v-show="tree.key" class="text-white" :style="{'margin-left': `${tree.level * 15}px`}")
      span(class="font-bold mr-[8px]") {{ tree.key }} :
      span(class="text-white")
        template(v-if="Object.keys(tree.child).length > 0")
          span(v-show="!tree.showChild" @click="tree.showChild = !tree.showChild") [ + ]
          span(v-show="tree.showChild" @click="tree.showChild = !tree.showChild") [ - ]
      span(v-show="Object.keys(tree.child).length === 0" class="font-bold text-[#EEA4AF]") {{ tree.value }}
    TreeItem(:treeData="tree.child" v-show="tree.showChild") /
</template>

<script setup lang="ts">
import type { TreeData } from '@/model/tree'
import { computed } from 'vue';

interface Props {
  treeData: Record<string, TreeData>
}

const props = defineProps<Props>()
const hasChild = computed(() => Object.keys(props.treeData).length > 0)
</script>