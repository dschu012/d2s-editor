<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
  export default {
    props: ['options', 'modelValue'],
    mounted() {
      const vm = this
      $(this.$el)
        // init select2
        .select2({ data: this.options })
        .val(this.modelValue)
        .trigger('change')
        // emit event on change.
        .on('change', function() {
          vm.$emit('update:modelValue', this.value)
        })
    },
    watch: {
      modelValue(value) {
        // update value
        $(this.$el)
          .val(value)
          .trigger('change')
      },
      options(options) {
        // update options
        $(this.$el)
          .empty()
          .select2({ data: options })
      }
    },
    unmounted() {
      $(this.$el)
        .off()
        .select2('destroy')
    }
  };
</script>