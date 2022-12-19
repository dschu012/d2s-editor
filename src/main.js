import { createApp } from 'vue'
import App from './components/App.vue';

import select2 from './components/Select2.vue'
import Select2 from './Select2.js';
import utils from './utils.js';

window.uuid = utils.uuidv4();

createApp(App)
.component('select2', select2)
.directive('select', Select2)
.mount('#app');