import Item from './Item.js';

import html from '../../html.js';

export default {
  template: html`
<div class="grid" :class="gridClass">
  <Item v-for="(item, idx) in items" :key="idx" :item.sync="item" @click.native="onSelect(item)" />
</div>
`,
components: {
  Item
},
props: {
  items: Array,
  width: Number,
  height: Number,
},
computed: {
  gridClass() {
    return `w-${this.width} h-${this.height}`;
  },
},
methods: {
  onSelect(item) {
    this.$emit('item-selected', item);
  }
}
};