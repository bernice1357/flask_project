import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import HighchartsVue from 'highcharts-vue';
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/font/index.css'

createApp(App).use(store).use(HighchartsVue).use(ElementPlus).use(router).mount('#app')













