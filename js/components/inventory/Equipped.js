import Item from './Item.js';

import html from '../../html.js';

export default {
  template: html`
<div class="inventory">
  <span class="head" v-on:drop="drop($event, 1)" v-on:dragover="allowDrop">
    <Item v-if="head" :item.sync="head" @click.native="onSelect(head)" /></span>
  <span class="neck" v-on:drop="drop($event, 2)" v-on:dragover="allowDrop">
    <Item v-if="neck" :item.sync="neck" @click.native="onSelect(neck)" /></span>
  <span class="torso" v-on:drop="drop($event, 3)" v-on:dragover="allowDrop">
    <Item v-if="torso" :item.sync="torso" @click.native="onSelect(torso)" /></span>
  <span class="right-tab tabs">
    <div class="btn-group" role="group">
      <button type="button" class="tab btn btn-secondary" :class="{ active: !alt_displayed }"
        @click="setAltDisplayed(false)">I</button>
      <button type="button" class="tab btn btn-secondary" :class="{ active: alt_displayed }"
        @click="setAltDisplayed(true)">II</button>
    </div>
  </span>
  <span v-show="!alt_displayed" class="right-hand weapon" v-on:drop="drop($event, 4)" v-on:dragover="allowDrop">
    <Item v-if="right_hand" :item.sync="right_hand" @click.native="onSelect(right_hand)" />
  </span>
  <span v-show="alt_displayed" class="alt-right-hand weapon" v-on:drop="drop($event, 11)" v-on:dragover="allowDrop">
    <Item v-if="alt_right_hand" :item.sync="alt_right_hand" @click.native="onSelect(alt_right_hand)" />
  </span>
  <span class="left-tab tabs">
    <div class="btn-group" role="group">
      <button type="button" class="tab btn btn-secondary" :class="{ active: !alt_displayed }"
        @click="setAltDisplayed(false)">I</button>
      <button type="button" class="tab btn btn-secondary" :class="{ active: alt_displayed }"
        @click="setAltDisplayed(true)">II</button>
    </div>
  </span>
  <span v-show="!alt_displayed" class="left-hand weapon" v-on:drop="drop($event, 5)" v-on:dragover="allowDrop">
    <Item v-if="left_hand" :item.sync="left_hand" @click.native="onSelect(left_hand)" />
  </span>
  <span v-show="alt_displayed" class="alt-left-hand weapon" v-on:drop="drop($event, 12)" v-on:dragover="allowDrop">
    <Item v-if="alt_left_hand" :item.sync="alt_left_hand" @click.native="onSelect(alt_left_hand)" />
  </span>
  <span class="right-finger ring" v-on:drop="drop($event, 6)" v-on:dragover="allowDrop">
    <Item v-if="right_finger" :item.sync="right_finger" @click.native="onSelect(right_finger)" /></span>
  <span class="left-finger ring" v-on:drop="drop($event, 7)" v-on:dragover="allowDrop">
    <Item v-if="left_finger" :item.sync="left_finger" @click.native="onSelect(left_finger)" /></span>
  <span class="waist" v-on:drop="drop($event, 8)" v-on:dragover="allowDrop">
    <Item v-if="waist" :item.sync="waist" @click.native="onSelect(waist)" /></span>
  <span class="feet" v-on:drop="drop($event, 9)" v-on:dragover="allowDrop">
    <Item v-if="feet" :item.sync="feet" @click.native="onSelect(feet)" /></span>
  <span class="hands" v-on:drop="drop($event, 10)" v-on:dragover="allowDrop">
    <Item v-if="hands" :item.sync="hands" @click.native="onSelect(hands)" /></span>
</div>
`,
components: {
  Item
},
data() {
  return {
    alt_displayed: false
  };
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
props: {
  items: Array,
},
methods: {
  setAltDisplayed(value) {
    this.alt_displayed = value;
  },
  onSelect(item) {
    this.$emit('item-selected', item);
  },
  allowDrop(event) {
    event.preventDefault();
  },
  drop(event, equipped_location) {
    event.preventDefault();
    this.$emit('item-event', {
      item: JSON.parse(event.dataTransfer.getData("item")),
      location: {
        location: 1,
        equipped_location: equipped_location,
      },
      type: 'move'
    });
  }
}
};