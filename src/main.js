import { createApp } from 'vue'
import CarbonVue from '@carbon/vue'
import App from './App.vue'
import './styles/carbon-g90.css'

const app = createApp(App)
app.use(CarbonVue)
app.mount('#app')