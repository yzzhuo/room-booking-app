import { createApp } from 'vue'
import CarbonVue from '@carbon/vue'
import router from './router'
import App from './App.vue'
import './styles/carbon-g90.css'
import './styles/tailwind.css'


const app = createApp(App)
app.use(CarbonVue)
app.use(router)
app.mount('#app')