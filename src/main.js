import { createApp } from 'vue'
import App from './components/App.vue';

import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

import VueTippy from 'vue-tippy'

import utils from './utils.js';

window.uuid = utils.uuidv4();

createApp(App)
  .component('multiselect', Multiselect)
  .use(
    VueTippy,
    // optional
    {
      directive: 'tippy', 
      component: 'tippy',
      componentSingleton: 'tippy-singleton',
      defaultProps: {
        placement: 'auto-end',
        allowHTML: true,
      },
    }
  )
  .mount('#app');