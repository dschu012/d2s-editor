import App from './components/App.js';

const app = Vue.createApp({
  template: '<App></App>',
  components: {
    App,
  },
});

app.directive('select', {
  inserted: function (el, binding) {
    var self = this;
    $(el).select2({
      width: 'auto',
      dropdownParent: binding.value ? $(binding.value) : null
    }).on('change', function (e) {
      if (e.detail === "vue-directive") {
        return;
      }
      el.dispatchEvent(new CustomEvent("change", {
        detail: "vue-directive"
      }));
      return false;
    })
  }
});

app.mount('#app');