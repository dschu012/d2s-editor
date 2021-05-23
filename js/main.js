import utils from './utils.js';
import App from './components/App.js';
import Select2 from './Select2.js';


window.uuid = utils.uuidv4();

const app = Vue.createApp({
  template: '<App></App>',
  components: {
    App,
  },
});

app.directive('select', Select2);

app.mount('#app');