import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModal = defineStore('useModal', {
  state: () => ({
    modalVisible: false
  }),
  actions: {
    toggleModal(boolean: boolean) {
      this.modalVisible = boolean
    }
  }
})
