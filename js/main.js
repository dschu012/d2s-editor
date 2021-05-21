import App from './components/App.js';
import Select2 from './Select2.js';

const app = Vue.createApp({
  template: '<App></App>',
  components: {
    App,
  },
});

app.directive('select', Select2);

app.mount('#app');