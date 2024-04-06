import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import store from './router/store' // utk vueX
import VueApexCharts from 'vue3-apexcharts'  // utk buat chart
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
// Import PrimeVue CSS dependencies
import 'primevue/resources/themes/saga-blue/theme.css'       // theme
import 'primevue/resources/primevue.min.css'                // core css
// import mitt from 'mitt' // buat emit pakai router-view


// Modifikasi, tambah store vuex
const app = createApp(App);
// tambah emitter
// const emitter = mitt();


app.use(router);
app.use(store);
app.use(VueApexCharts);
app.use(PrimeVue);
app.use(ConfirmationService);
// app.config.globalProperties.emitter = emitter;
app.mount('#app');
// End Modif

// Original
// createApp(App).use(router).mount('#app')
