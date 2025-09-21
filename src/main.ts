// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// آیکون‌ها
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// اگر می‌خوای زبان فارسی RTL باشه:
import { fa } from 'vuetify/locale'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'fa',
    messages: { fa },
    rtl: {
      fa: true, // فعال‌سازی راست به چپ برای فارسی
    },
  },
})

createApp(App).use(vuetify).mount('#app')
