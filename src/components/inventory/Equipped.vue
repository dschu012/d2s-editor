<template>
  <div class="inventory">
    <div class="equipped">
      <span
          class="d2p-slot-head"
          v-on:drop="drop($event, 1)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 1)"
          v-on:dragleave="dragleave($event, 1)">
      <div
          class="d2p-slot-head"
          :class="{'d2p-slot-background':!head}"/>
      <div
          class="layer"
          :id="id + '-1'"/>
      <Item
          class="d2p-slot-item"
          v-if="head"
          :item.sync="head"
          @click.native="onSelect(head)"
          @contextmenu.prevent.stop="itemRC($event, head)"/></span>

      <span
          class="neck"
          v-on:drop="drop($event, 2)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 2)"
          v-on:dragleave="dragleave($event, 2)"><div
          class="layer"
          :id="id + '-2'"></div>
      <Item
          v-if="neck"
          :item.sync="neck"
          @click.native="onSelect(neck)"
          @contextmenu.prevent.stop="itemRC($event, neck)"/></span>
      <span
          class="torso"
          v-on:drop="drop($event, 3)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 3)"
          v-on:dragleave="dragleave($event, 3)"><div
          class="layer"
          :id="id + '-3'"></div>
      <Item
          v-if="torso"
          :item.sync="torso"
          @click.native="onSelect(torso)"
          @contextmenu.prevent.stop="itemRC($event, torso)"/></span>
      <span class="right-tab tabs">
      <div
          class="btn-group"
          role="group">
        <button
            type="button"
            class="tab btn btn-secondary"
            :class="{ active: !alt_displayed }"
            @click="setAltDisplayed(false)">I</button>
        <button
            type="button"
            class="tab btn btn-secondary"
            :class="{ active: alt_displayed }"
            @click="setAltDisplayed(true)">II</button>
      </div>
    </span>
      <span
          v-show="!alt_displayed"
          class="right-hand weapon"
          v-on:drop="drop($event, 4)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 4)"
          v-on:dragleave="dragleave($event, 4)"><div
          class="layer"
          :id="id + '-4'"></div>
      <Item
          v-if="right_hand"
          :item.sync="right_hand"
          @click.native="onSelect(right_hand)"
          @contextmenu.prevent.stop.stop="itemRC($event, right_hand)"/>
    </span>
      <span
          v-show="alt_displayed"
          class="alt-right-hand weapon"
          v-on:drop="drop($event, 11)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 11)"
          v-on:dragleave="dragleave($event, 11)"><div
          class="layer"
          :id="id + '-11'"></div>
      <Item
          v-if="alt_right_hand"
          :item.sync="alt_right_hand"
          @click.native="onSelect(alt_right_hand)"
          @contextmenu.prevent.stop="itemRC($event, alt_right_hand)"/>
    </span>
      <span class="left-tab tabs">
      <div
          class="btn-group"
          role="group">
        <button
            type="button"
            class="tab btn btn-secondary"
            :class="{ active: !alt_displayed }"
            @click="setAltDisplayed(false)">I</button>
        <button
            type="button"
            class="tab btn btn-secondary"
            :class="{ active: alt_displayed }"
            @click="setAltDisplayed(true)">II</button>
      </div>
    </span>
      <span
          v-show="!alt_displayed"
          class="left-hand weapon"
          v-on:drop="drop($event, 5)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 5)"
          v-on:dragleave="dragleave($event, 5)"><div
          class="layer"
          :id="id + '-5'"></div>
      <Item
          v-if="left_hand"
          :item.sync="left_hand"
          @click.native="onSelect(left_hand)"
          @contextmenu.prevent.stop="itemRC($event, left_hand)"/>
    </span>
      <span
          v-show="alt_displayed"
          class="alt-left-hand weapon"
          v-on:drop="drop($event, 12)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 12)"
          v-on:dragleave="dragleave($event, 12)"><div
          class="layer"
          :id="id + '-12'"></div>
      <Item
          v-if="alt_left_hand"
          :item.sync="alt_left_hand"
          @click.native="onSelect(alt_left_hand)"
          @contextmenu.prevent.stop="itemRC($event, alt_left_hand)"/>
    </span>
      <span
          class="right-finger ring"
          v-on:drop="drop($event, 6)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 6)"
          v-on:dragleave="dragleave($event, 6)"><div
          class="layer"
          :id="id + '-6'"></div>
      <Item
          v-if="right_finger"
          :item.sync="right_finger"
          @click.native="onSelect(right_finger)"
          @contextmenu.prevent.stop="itemRC($event, right_finger)"/></span>
      <span
          class="left-finger ring"
          v-on:drop="drop($event, 7)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 7)"
          v-on:dragleave="dragleave($event, 7)"><div
          class="layer"
          :id="id + '-7'"></div>
      <Item
          v-if="left_finger"
          :item.sync="left_finger"
          @click.native="onSelect(left_finger)"
          @contextmenu.prevent.stop="itemRC($event, left_finger)"/></span>
      <span
          class="belt"
          v-on:drop="drop($event, 8)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 8)"
          v-on:dragleave="dragleave($event, 8)"><div
          class="layer"
          :id="id + '-8'"></div>
      <Item
          v-if="belt"
          :item.sync="belt"
          @click.native="onSelect(belt)"
          @contextmenu.prevent.stop="itemRC($event, belt)"/></span>
      <span
          class="feet"
          v-on:drop="drop($event, 9)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 9)"
          v-on:dragleave="dragleave($event, 9)"><div
          class="layer"
          :id="id + '-9'"></div>
      <Item
          v-if="feet"
          :item.sync="feet"
          @click.native="onSelect(feet)"
          @contextmenu.prevent.stop="itemRC($event, feet)"/></span>
      <span
          class="hands"
          v-on:drop="drop($event, 10)"
          v-on:dragover="dragover"
          v-on:dragenter="dragenter($event, 10)"
          v-on:dragleave="dragleave($event, 10)"><div
          class="layer"
          :id="id + '-10'"></div>
      <Item
          v-if="hands"
          :item.sync="hands"
          @click.native="onSelect(hands)"
          @contextmenu.prevent.stop="itemRC($event, hands)"/></span>
    </div>

    <!-- <span id="grid" class="d2p-InventoryGrid" :class="gridClass">
      <div class="h-1 cell" :class="'y-' + (h - 1)" v-for="h in grid.inv.h">
        <div :id="id + '-' + w + '-' + h" class="w-1 h-1 y-0 cell" :class="'x-' + (w - 1)" v-for="w in grid.inv.w"
            v-on:drop="drop($event, w, h)" v-on:dragover="dragover" v-on:dragenter="dragenter($event, w, h)"
            v-on:dragleave="dragleave($event, w, h)" @contextmenu.prevent.stop="gridRC($event, w, h)">
        </div>
      </div>
      <Item v-for="(item, idx) in inventory" :key="idx" :item.sync="item" @click.native="onSelect(item)" @contextmenu.prevent.stop="itemRC($event, item)"/>
    </span> -->

    <Grid :width="grid.inv.w"
          :height="grid.inv.h"
          :page="1"
          :items.sync="inventory"
          @item-selected="onSelect"
          @item-event="onEvent"
          :id="'InventoryGrid'"
          class="equippedInventoryGrid"
    </Grid>
  </div>

<!--  <ItemEditor-->
<!--      v-if="selected"-->
<!--      :id="'Selected'"-->
<!--      :item.sync="selected"-->
<!--      :location="location"-->
<!--      ref="editor"-->
<!--      @item-event="onEvent"></ItemEditor>-->

</template>

<script>
import Item from './Item.vue'
import Grid from './Grid.vue'
import ItemEditor from './ItemEditor.vue'

export default {
  components: {
    Item,
    Grid,
    ItemEditor
  },
  data() {
    return {
      // selected: null,
      alt_displayed: false,
      grid: {inv: {w: 10, h: 4}},
    };
  },
  computed: {
    gridClass() {
      return `w-${this.grid.inv.w} h-${this.grid.inv.h}`;
    },
    head() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 1);
    },
    neck() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 2);
    },
    torso() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 3);
    },
    right_hand() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 4);
    },
    left_hand() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 5);
    },
    right_finger() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 6);
    },
    left_finger() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 7);
    },
    belt() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 8);
    },
    feet() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 9);
    },
    hands() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 10);
    },
    alt_right_hand() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 11);
    },
    alt_left_hand() {
      return this.items.find(e => e.location_id === 1 && e.equipped_id === 12);
    },
    inventory() {
      return this.items.filter(e => e.location_id === 0 && e.alt_position_id === 1);
    }
  },
  props: {
    items: Array,
    id: String,
    contextMenu: Object,
  },
  methods: {
    setAltDisplayed(value) {
      this.alt_displayed = value;
    },
    onSelect(item) {
      //console.log(item);
      // this.selected = item;
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
    },
    dragover(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      return false;
    },
    dragenter(event, equipped_location) {
      event.preventDefault();
      let data = JSON.parse(localStorage.getItem('dragElement'));
      this.$emit('item-event', {
        uuid: data.uuid,
        item: data.item,
        id: `${this.id}-${equipped_location}`,
        location: {
          location: 1,
          equipped_location: equipped_location,
        },
        type: 'dragenter'
      });
    },
    dragleave(event, equipped_location) {
      event.preventDefault();
      let data = JSON.parse(localStorage.getItem('dragElement'));
      this.$emit('item-event', {
        uuid: data.uuid,
        item: data.item,
        id: `${this.id}-${equipped_location}`,
        location: {
          location: 1,
          equipped_location: equipped_location,
        },
        type: 'dragleave'
      });
    },
    drop(event, equipped_location) {
      event.preventDefault();
      let data = JSON.parse(localStorage.getItem('dragElement'));
      this.$emit('item-event', {
        uuid: data.uuid,
        item: data.item,
        id: `${this.id}-${equipped_location}`,
        location: {
          location: 1,
          equipped_location: equipped_location,
        },
        type: 'move'
      });
    },
  }
};
</script>
