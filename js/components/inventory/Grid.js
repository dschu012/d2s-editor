import Item from './Item.js';

import html from '../../html.js';

export default {
  template: html`
<div id="grid" class="grid" :class="gridClass">
  <div class="h-1 cell" :class="'y-' + (h - 1)" v-for="h in height">
    <div :id="id + '-' + w + '-' + h" class="w-1 h-1 y-0 cell" :class="'x-' + (w - 1)" v-for="w in width" 
         v-on:drop="drop($event, w, h)" v-on:dragover="dragover" v-on:dragenter="dragenter($event, w, h)" 
         v-on:dragleave="dragleave($event, w, h)" @contextmenu.prevent.stop="gridRC($event, w, h)">
    </div>
  </div>
  <Item v-for="(item, idx) in items" :key="idx" :item.sync="item" @click.native="onSelect(item)" 
        @contextmenu.prevent.stop="itemRC($event, item)"/>
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
  id: String,
  contextMenu: Object,
},
computed: {
  gridClass() {
    return `w-${this.width} h-${this.height}`;
  },
},
methods: {
  test($evt) {
    console.log($evt);
  },
  onSelect(item) {
    this.$emit('item-selected', item);
  },
  dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  },
  dragenter(event, x, y) {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('dragElement'));
    this.$emit('item-event', {
      uuid: data.uuid,
      item: data.item,
      id: `${this.id}-${x}-${y}`,
      location: {
        location: 0,
        x: x - 1,
        y: y - 1,
        storage_page: this.page
      },
      type: 'dragenter'
    });
  },
  dragleave(event, x, y) {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('dragElement'));
    this.$emit('item-event', {
      uuid: data.uuid,
      item: data.item,
      id: `${this.id}-${x}-${y}`,
      location: {
        location: 0,
        x: x - 1,
        y: y - 1,
        storage_page: this.page
      },
      type: 'dragleave'
    });
  },
  itemRC($evt, item) {
    this.contextMenu.showContextMenu($evt, item, [
        {text: "Select"},
        {text: "Copy"},
        {text: "Share"},
        {text: "Delete"}
    ])
  },
  gridRC($evt, w, h) {
    this.contextMenu.showContextMenu($evt, [w - 1, h - 1], [
        {text: "Paste At"}
    ])
  },
  drop(event, x, y) {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem('dragElement'));
    this.$emit('item-event', {
      uuid: data.uuid,
      item: data.item,
      id: `${this.id}-${x}-${y}`,
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
