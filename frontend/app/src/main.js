import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.json"

import store from './store'; // Putanja do vašeg Vuex Store

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)

app.use(store);
app.use(router)

app.mount('#app')
