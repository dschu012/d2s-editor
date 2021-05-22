import Item from './Item.js';

import html from '../../html.js';

export default {
  template: html`
<div class="grid" :class="gridClass">
  <div class="cell" v-for="h in height">
    <div class="w-1 h-1 cell" v-for="w in width" v-on:drop="drop($event, w, h)" v-on:dragover="allowDrop">
    </div>
  </div>
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
  page: Number,
},
computed: {
  gridClass() {
    return `w-${this.width} h-${this.height}`;
  },
},
methods: {
  onSelect(item) {
    this.$emit('item-selected', item);
  },
  allowDrop(event) {
    event.preventDefault();
  },
  drop(event, x, y) {
    event.preventDefault();
    this.$emit('item-event', {
      item: JSON.parse(event.dataTransfer.getData("item")),
      location: {
        location: 0,
        x: x - 1,
        y: y - 1,
        storage_page: this.page
      },
      type: 'move'
    });
  }
}
};