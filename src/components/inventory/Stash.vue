<template>
  <div class="stash-">
      <div class="row-mt-3">
        <div class="btn-group offset-md-3 col-md-2" role="group">
          <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 1 }"
            @click="changeTab(1)">Personal</button>
          <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 2 }"
            @click="changeTab(2)">Shared</button>             
          <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 3 }"
            @click="changeTab(3)">Shared</button>  
          <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 4 }"
            @click="changeTab(4)">Shared</button> 
        </div>
        <div class="col-md-2">
          <div class="float-right">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"></button>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="p-3 form-group">
                <div class="form-row">
                  <div class="col-md-12">
                    <label>Shared Stash</label>
                    <div class="input-group">
                      <input type="number" min="1" max="20" class="form-control" v-model.number="grid.stash.w"
                        @input="gridChange">
                      <div class="input-group-prepend input-group-append">
                        <div class="input-group-text">,</div>
                      </div>
                      <input type="number" min="1" max="20" class="form-control" v-model.number="grid.stash.h"
                        @input="gridChange">
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      <Grid v-if="activeTab == 1" :width="grid.stash.w" :height="grid.stash.h" :page="1"
        :items.sync="stash(0)" @item-selected="onSelect" @item-event="onEvent" :id="'Grid'" :contextMenu="$refs.contextMenu"></Grid>  
      <Grid v-if="activeTab == 2" :width="grid.stash.w" :height="grid.stash.h" :page="2"
        :items.sync="stash(1)" @item-selected="onSelect" @item-event="onEvent" :id="'Grid'" :contextMenu="$refs.contextMenu"></Grid>
      <Grid v-if="activeTab == 3" :width="grid.stash.w" :height="grid.stash.h" :page="3"
        :items.sync="stash(2)" @item-selected="onSelect" @item-event="onEvent" :id="'Grid'" :contextMenu="$refs.contextMenu"></Grid>
      <Grid v-if="activeTab == 4" :width="grid.stash.w" :height="grid.stash.h" :page="4"
        :items.sync="stash(3)" @item-selected="onSelect" @item-event="onEvent" :id="'Grid'" :contextMenu="$refs.contextMenu"></Grid>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import Grid from './Grid.vue';

export default {
  name: 'Stash',
  components: {
  Item,
  Grid },
  data() {
    return {
      activeTab: 1,
      grid: { stash: { w: 10, h: 10 } },
    };
  },
  props: {
    items: Object,
  },
  computed: {

  },
  methods: {
    onSelect(item) {
      this.$emit('item-selected', item);
    },
    stash(i) { return this.items.pages[i].items || [] },
    changeTab(i) {
      this.activeTab = i;
    },
  }
}
</script>