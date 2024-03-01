<template>
  <div class="item-editor">
    <div class="form-row item-action-bar">
      <div class="col-md-12">
        <button type="button" class="btn btn-primary" @click="onEvent('share')">Share</button>
        <button type="button" class="btn btn-primary" @click="onEvent('copy')">Copy</button>
        <span v-if="item.location_id != 6">
          <button type="button" class="btn btn-danger" @click="onEvent('delete')">Delete</button>
        </span>
      </div>
    </div>

    <div class="form-row header">
      <div class="item-preview">
        <!-- <Item :item.sync="item" clazz="item-edit"></Item> -->
        <Item :item="item" clazz="item-edit" @update:item="item = $event" />
      </div>

      <ul className="item-options">
        <span v-if="!item.simple_item">
          <li>
            Item Level: 
            <input class="edit-box" type="number" v-model.number="item.level" min="1" max="99" @input="onEvent('update')"/>
          </li>
          <li>
            <label>Quality:</label>
            <multiselect v-model.number="item.quality" :options="rarities_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
          </li>
          <li>
            <div v-if="item.quality == 4">
              <label>Prefix:</label>
              <multiselect v-model.number="item.magic_prefix" :options="magic_prefixes_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
              <label>Suffix:</label>
              <multiselect v-model.number="item.magic_suffix" :options="magic_suffixes_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
            </div>
            <div v-if="item.quality == 6 || item.quality == 8">
              <label>Prefix:</label>
              <multiselect v-model.number="item.rare_name_id" :options="rare_names_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
              <label>Suffix:</label>
              <multiselect v-model.number="item.rare_name_id2" :options="rare_names_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
            </div>
          </li>
          <li>
            <div v-if="item.quality == 5">
              <label>Set Name:</label>
              <multiselect v-model.number="item.set_id" :options="set_items_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onEvent('update')"/>
            </div>
          </li>
        </span>

        <li>
          <div v-if="!item.is_ear">
            Base:
              <multiselect v-model="item.type" :options="getBasesOptions(item.type)" :searchable="true" :can-deselect="false" :can-clear="false" :required="true" @update:model-value="onEvent('update')" />
          </div>
        </li>
        <li>
          <div v-if="item.defense_rating">
            <label>Defense:</label>
            <input class="edit-box" type="number" v-model.number="item.defense_rating" min="1" max="999" @input="onEvent('update')"/>
          </div>
        </li>
        <li>
          <!-- <div>{{getItemMaxSockets()}}</div> -->
          <div v-if="getItemMaxSockets() > 0 &&!item.given_runeword">
            <label>Sockets:</label>
            <input class="edit-box" type="number" v-model.number="item.total_nr_of_sockets" min="0" :max="getItemMaxSockets()" @input="onEvent('update')"/>
          </div>
        </li>
        <li>
          <div v-if="itemCanEthereal(item.type)">
            <div class="form-check form-check-inline">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" v-model.number="item.ethereal" :true-value="1" :false-value="0" @change="onEvent('update')">
                Ethereal
              </label>
            </div>
          </div>  
        </li>
      </ul>
    </div>
    
    <div v-if="!item.simple_item" class="item-stats">
      <div v-if="item.magic_attributes" class="item-magic-stats">
        <div>Item Stats</div>
        <ItemStatsEditor :id="id + 'Magic'" v-model:item-stats="item.magic_attributes" @stat-change="onEvent('update')"/>
      </div>
      <div v-if="item.runeword_attributes" class="item-runeword-stats">
        <div>Runeword Stats</div>
        <ItemStatsEditor :id="id + 'Runeword'" v-model:item-stats="item.runeword_attributes" @stat-change="onEvent('update')"/>
      </div>
      <div v-if="item.set_attributes" class="item-set-stats">
        <div v-for="(set_attribute, idx) in item.set_attributes">
          <div>Set Stats {{idx}}</div>
          <ItemStatsEditor :id="id + 'Set' + idx" v-model:item-stats="item.set_attributes[idx]" @stat-change="onEvent('update')"/>
        </div>
      </div>
      <div v-if="item.socketed_items" class="item-socketed-stats">
        <div>Sockets Stats</div>
        <ItemStatsEditor :id="id + 'Socketed stats'" v-model:item-stats.sync="item.socketed_attributes" @stat-change="onEvent('update')"/>
      </div>
      <!-- 
      <div v-if="item.socketed_items">
        <div v-for="(socketed_item, index) in item.socketed_items">
          <ItemEditor ref="itemEditor" :item.sync="socketed_item" :id="id + 'Socketed' + index" @item-event="onChildEvent"></>
        </div>
      </div> 
      -->
    </div>
    
  </div>
</template>

<script>
import Item from './Item.vue';
import ItemStatsEditor from './ItemStatsEditor.vue';

export default {
  name: 'ItemEditor',
  props: {
    id: String,
    item: Object,
    location: Object,
  },
  components: {
    Item,
    ItemStatsEditor,
  },
  data() {
    return {
      max_sockets : 0,
      rarities_options: [{ value: 1, label: 'Low' }, { value: 2, label: 'Normal' }, { value: 3, label: 'Superior' }, { value: 4, label: 'Magic' }, { value: 5, label: 'Set' }, { value: 6, label: 'Rare' }, { value: 7, label: 'Unique' }, { value: 8, label: 'Crafted' }],
      locations: [{ key: 0, value: 'Stored' }, { key: 1, value: 'Equipped' }, { key: 4, value: 'Cursor' }],
      equipped_locations: [{ key: 1, value: 'Head' }, { key: 2, value: 'Neck' }, { key: 3, value: 'Torso' }, { key: 4, value: 'Right Hand' }, { key: 5, value: 'Left Hand' }, { key: 6, value: 'Right Finger' }, { key: 7, value: 'Left Finger' }, { key: 8, value: 'Waist' }, { key: 9, value: 'Boots' }, { key: 10, value: 'Gloves' }, { key: 11, value: 'Alternate Right Hand' }, { key: 12, value: 'Alternate Left Hand' }],
      storage_pages: [{ key: 1, value: 'Inventory' }, { key: 4, value: 'Cube' }, { key: 5, value: 'Stash' }],
      magic_prefixes_options: window.constants.magic_prefixes
        .fill({id: 0, n: "None"}, 0, 1)
        .filter(entry => entry && entry.n)
        //.map((entry, i) => { return {value: i, label: entry.n} }),
        .map(entry => ({value: entry.id, label: entry.n})),
      magic_suffixes_options: window.constants.magic_suffixes
        .fill({id: 0, n: "None"}, 0, 1)
        .filter(entry => entry && entry.n)
        .map(entry => ({value: entry.id, label: entry.n})),
      rare_names_options: window.constants.rare_names
        .fill({id: 0, n: "None"}, 0, 1)
        .filter(entry => entry && entry.n)
        .map(entry => ({value: entry.id, label: entry.n})),
      unq_items: window.constants.unq_items
        .map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
      set_items_options: window.constants.set_items
        .filter(entry => entry && entry.n)
        .map(entry => ({value: entry.id, label: entry.n})),
      armor_items: Object.entries(window.constants.armor_items).filter(e => e[1].n != null),
      weapon_items: Object.entries(window.constants.weapon_items).filter(e => e[1].n != null),
      other_items: Object.entries(window.constants.other_items).filter(e => e[1].n != null),
    };
  },
  methods: {
    onEvent(type) {
      this.$emit('item-event', { item: this.item, type: type });
    },
    onChildEvent(e) {
      this.$emit('item-event', { item: e.item, type: e.type });
    },
    onMove() {
      this.$emit('item-event', { item: this.item, location: this.location, type: 'move' });
    },
    getBasesOptions(code) {
      const constants = window.constants;
      if (this.item.type_id == 3) {
        return this.findBasesInConstants(code, constants.weapon_items)
      } else if (this.item.type_id == 1) {
        return this.findBasesInConstants(code, constants.armor_items)
      } else if (this.item.type_id == 4) {
        return Object.entries(constants.other_items)
          .filter((entry) => entry[1].n)
          .map((entry) => ({ value: entry[0], label: entry[1].n }))
      } else {
        return []
      }
    },
    findBasesInConstants(code, items) {
      let bases = [];
      const orig = items[code];
      if (orig) {
        //NORMAL SET UNIQUE CRAFTED
        if (this.item.quality == 5 || this.item.quality == 6 || this.item.quality == 7 || this.item.quality == 8) {
          bases = [orig.nc, orig.exc, orig.elc]
            .filter(id => items[id])
        }
        else {
          bases = Object.keys(items).filter(id => {
            const item = items[id];
            if (this.item.given_runeword == 1 && item.gemsockets < this.item.total_nr_of_sockets) return false;
            //return item.spawnable && item.type === orig.type && item.handed2 == orig.handed2 && item.handed1or2 == orig.handed1or2;
            if (orig.c.length > 2) 
              return item.eq1n == orig.eq1n 
            else 
              return item.type === orig.type;
          }).sort((a, b) => items[a].level < items[b].level);
        }
        bases = Object.entries(items)
          .filter((entry) => bases.includes(entry[0]))
          .map((entry) => ({ value: entry[0], label: entry[1].n }))
      }  
      return bases;
    },
    getItemMaxSockets() {
      let code = this.item.type;
      const constants = window.constants;
      if (this.item.type_id == 3) {
        return this.itemMaxSockets(constants.weapon_items[code])
      } else if (this.item.type_id == 1) {
        return this.itemMaxSockets(constants.armor_items[code])
      } 
      return 0; 
    },
    itemMaxSockets(item) {
      if (!item) return 0;
      let boxSockets = 0;
      //const type = Data.itemTypes[base.type];
      //type.maxsock40
      const maxsockets = Math.min(item.gemsockets, item.iw * item.ih);
      switch (this.item.quality) {
        //Quality.MAGIC:
        case 4:
          return Math.min(Math.max(boxSockets, 2), maxsockets);
       //Quality.RARE:
        case 6:
          return Math.min(Math.max(boxSockets, 1), maxsockets);
        //Quality.SET:
        case 5:
          return Math.min(Math.max(boxSockets, 1), maxsockets);
        //Quality.UNIQUE:
        case 7:
          return Math.min(Math.max(boxSockets, 1), maxsockets);
        //Quality.CRAFTED
        case 8:
          return Math.min(Math.max(boxSockets, 1), maxsockets);
        default:
          return maxsockets;
      }
    },  
    itemCanEthereal() {
      //SET
      if (this.item.quality == 5) return false;
      if (this.item.given_runeword == 1 && this.item.indesctructible) return false;
      //CRAFTED
      if (this.item.quality == 8) return false;

      //if (this.baseNoDurability(base)) return false;
      let code = this.item.type;
      const constants = window.constants;
      if (this.item.type_id == 3) {
        return !this.baseNoDurability(constants.weapon_items[code])
      } else if (this.item.type_id == 1) {
        return !this.baseNoDurability(constants.armor_items[code])
      } else if (this.item.type_id == 4) { 
        return false;
      }   
      return true;
    },
    baseNoDurability(base) {
      if (!base.nodurability) return false;
      //not RARE UNIQUE SET
      if (this.item.quality !== 6 && this.item.quality !== 7 && (this.item.quality !== 5)) return true;
      // const prev = [base.nc, base.exc, base.elc].filter(Boolean);
      // if (!prev.length) return true;
      // const curIndex = prev.indexOf(base.code);
      // if (curIndex >= 0) prev.length = curIndex;
      // return !prev.some(id => !items[id]?.nodurability);
    }
  },
  computed: {
  }
};  
</script>