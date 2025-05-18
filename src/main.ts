import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .mount('#app');
