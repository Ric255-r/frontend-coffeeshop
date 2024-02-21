import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './router/store'

// Modifikasi, tambah store vuex
const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
// End Modif

// Original
// createApp(App).use(router).mount('#app')
