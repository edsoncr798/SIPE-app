import './assets/css/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import router from './router'

import './modules/firebaseConfig'

const app = createApp(App).use(router).use(ElementPlus)

router.isReady().then(async () => {
  app.mount('#app')
});
