<template>
  <div class="stash">
    <div
          class="btn-group"
          role="group">
        <button
            type="button"
            class="btn btn-secondary"
            :class="{ active: activeTab == 1 }"
            @click="changeTab(1)">Personal
        </button>
        <button
            type="button"
            class="btn btn-secondary"
            :class="{ active: activeTab == 2 }"
            @click="changeTab(2)">Shared
        </button>
        <button
            type="button"
            class="btn btn-secondary"
            :class="{ active: activeTab == 3 }"
            @click="changeTab(3)">Shared
        </button>
        <button
            type="button"
            class="btn btn-secondary"
            :class="{ active: activeTab == 4 }"
            @click="changeTab(4)">Shared
        </button>
    </div>
    <div class="stash-bg">
      <Grid
          v-if="activeTab == 1"
          :width="grid.stash.w"
          :height="grid.stash.h"
          :page="1"
          :items.sync="stash(0)"
          @item-selected="onSelect"
          @item-event="onEvent"
          :id="'Grid'"
          :contextMenu=contextMenu
          class="y-0"></Grid>
      <Grid
          v-if="activeTab == 2"
          :width="grid.stash.w"
          :height="grid.stash.h"
          :page="2"
          :items.sync="stash(1)"
          @item-selected="onSelect"
          @item-event="onEvent"
          :id="'Grid'"
          :contextMenu=contextMenu
          class="y-0"></Grid>
      <Grid
          v-if="activeTab == 3"
          :width="grid.stash.w"
          :height="grid.stash.h"
          :page="3"
          :items.sync="stash(2)"
          @item-selected="onSelect"
          @item-event="onEvent"
          :id="'Grid'"
          :contextMenu=contextMenu
          class="y-0"></Grid>
      <Grid
          v-if="activeTab == 4"
          :width="grid.stash.w"
          :height="grid.stash.h"
          :page="4"
          :items.sync="stash(3)"
          @item-selected="onSelect"
          @item-event="onEvent"
          :id="'Grid'"
          :contextMenu=contextMenu
          class="y-0"></Grid>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import Grid from './Grid.vue';
import ContextMenu from "../ContextMenu.vue";

export default {
  name: 'Stash',
  components: {
    Item,
    Grid,
    ContextMenu
  },
  data() {
    return {
      activeTab: 1,
      grid: {stash: {w: 10, h: 10}},
    };
  },
  props: {
    items: Array,
    id: String,
    contextMenu: Object,
  },
  computed: {},
  methods: {
    onSelect(item) {
      this.$emit('item-selected', item);
    },
    stash(i) {
      if (this.items.pages[i] == null) return [];
      return this.items.pages[i].items || []
    },
    changeTab(i) {
      this.activeTab = i;
    },
  }
}
</script>