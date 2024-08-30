import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import './index.css'
import CountryFlag from 'vue-country-flag-next'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('country-flag', CountryFlag)

app.mount('#app')
