import { createApp } from 'vue'
import { createPinia } from 'pinia';
import CarbonVue from '@carbon/vue'
import router from './router'
import App from './App.vue'
import './styles/carbon-g90.css'
import './styles/tailwind.css'
import './styles/global.css'


const app = createApp(App)
const pinia = createPinia();

app.use(CarbonVue)
app.use(router)
app.use(pinia);

app.mount('#app')