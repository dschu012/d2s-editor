import Item from './Item.js';

import html from '../../html.js';

export default {
  template: html`
<div class="grid" :class="gridClass">
  <div class="h-1 cell" :class="'y-' + (h - 1)" v-for="h in height">
    <div class="w-1 h-1 y-0 cell" :class="'x-' + (w - 1)" v-for="w in width" v-on:drop="drop($event, w, h)" v-on:dragover="dragover" v-on:dragenter="dragenter($event, w, h)" v-on:dragleave="dragleave($event, w, h)">
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
  dragover(event) {
    event.preventDefault();
  },
  dragenter(event, x, y) {
    event.preventDefault();
    //console.log(`dragenter ${x},${y} item:${event.dataTransfer.getData("item")} `)
  },
  dragleave(event, x, y) {
    event.preventDefault();
    //console.log(`dragleave ${x},${y} item:${event.dataTransfer.getData("item")} `)
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