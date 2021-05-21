export default {
  mounted: function (el, binding) {
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
};