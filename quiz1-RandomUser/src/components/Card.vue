<template lang="pug">
div.border.border-black.rounded-md
  div(class="border-b border-black mb-[15px] py-[4px] px-[10px]")
    slot(name="title")
  div(class="px-[10px]")
    slot(name="body")
</template>

<script setup lang="ts"></script>
