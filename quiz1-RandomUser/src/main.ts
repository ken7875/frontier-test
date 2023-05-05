import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import timeFormatDirective from '@/directive/timeFormat'
import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('timeFormat', timeFormatDirective)
app.mount('#app')
