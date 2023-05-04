<template lang="pug">
div
  label(:for="label" v-if="label") 
  select(:id="label" :value="modelValue" v-bind="{...$attrs, onChange: changeSelect }" class="border rounded-[8px] px-[10px] py-[5px]")
    option(v-for="option, idx in options" :key="idx" :value="option" :selected="option === modelValue") {{ option }}
</template>

<script setup lang="ts">
interface Props {
  label?: string
  modelValue: string | number
  options: any[]
}
const props = defineProps<Props>()

const emit = defineEmits(['update:modelValue'])
const changeSelect = ($event: Event) => emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
</script>
