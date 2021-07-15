import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './common/initialize.css'
import './common/iconfont.css'



createApp(App).use(Vant).use(router).mount('#app')
