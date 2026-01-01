import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import { registerPayurusSW } from './registerSW'
import { initRemoteConfig } from './services/remoteConfig'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

if (typeof window !== 'undefined') {
  initRemoteConfig()
}

app.mount('#app')

registerPayurusSW()
