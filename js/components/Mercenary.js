import Item from './inventory/Item.js';

import html from '../html.js';

export default {
  template: html`
<div class="inventory">
  <span class="head">
    <Item v-if="head" :item.sync="head" @click.native="onSelect(head)" @contextmenu.prevent.stop="itemRC($event, head)"/></span>
  <span class="torso">
    <Item v-if="torso" :item.sync="torso" @click.native="onSelect(torso)" @contextmenu.prevent.stop="itemRC($event, torso)"/></span>
  <span class="right-hand weapon">
    <Item v-if="right_hand" :item.sync="right_hand" @click.native="onSelect(right_hand)" @contextmenu.prevent.stop="itemRC($event, right_hand)"/></span>
  <span class="left-hand weapon">
    <Item v-if="left_hand" :item.sync="left_hand" @click.native="onSelect(left_hand)" @contextmenu.prevent.stop="itemRC($event, left_hand)"/></span>
</div>
`,
components: {
  Item
},
props: {
  items: Array,
  contextMenu: Object,
},
computed: {
  head() { return this.items.find(e => e.equipped_id === 1); },
  neck() { return this.items.find(e => e.equipped_id === 2); },
  torso() { return this.items.find(e => e.equipped_id === 3); },
  right_hand() { return this.items.find(e => e.equipped_id === 4); },
  left_hand() { return this.items.find(e => e.equipped_id === 5); },
  right_finger() { return this.items.find(e => e.equipped_id === 6); },
  left_finger() { return this.items.find(e => e.equipped_id === 7); },
  waist() { return this.items.find(e => e.equipped_id === 8); },
  feet() { return this.items.find(e => e.equipped_id === 9); },
  hands() { return this.items.find(e => e.equipped_id === 10); },
  alt_right_hand() { return this.items.find(e => e.equipped_id === 11); },
  alt_left_hand() { return this.items.find(e => e.equipped_id === 12); }
},
methods: {
  onSelect(item) {
    this.$emit('item-selected', item);
  },
  itemRC($evt, item) {
    if (item != null) {
      this.contextMenu.showContextMenu($evt, item, [
        {text: "Select"},
        {text: "Copy"},
        {text: "Share"},
        {text: "Delete"}
      ]);
    }
  }
}
};
