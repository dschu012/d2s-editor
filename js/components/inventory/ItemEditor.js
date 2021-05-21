import Item from './Item.js';
import ItemStatsEditor from './ItemStatsEditor.js';

import html from '../../html.js';

export default {
  template: html`
<div>
  <div class="form-row d-flex justify-content-between mt-3 pl-5 pr-5">
    <div></div>
    <div><Item :item.sync="item" clazz="item-edit"></Item></div>
    <div>
      <button type="button" class="btn btn-primary" @click="onEvent('copy')">Copy</button>
      <span v-if="item.location_id != 6">
        <button type="button" class="btn btn-danger" @click="onEvent('delete')">Delete</button>
      </span>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-12">
      <div class="form-check form-check-inline">
        <label class="form-check-label"><input class="form-check-input" type="checkbox"
            v-model.number="item.simple_item" :true-value="1" :false-value="0">Compact</label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label"><input class="form-check-input" type="checkbox"
            v-model.number="item.identified" :true-value="1" :false-value="0">Identified</label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label"><input class="form-check-input" type="checkbox"
            v-model.number="item.socketed" :true-value="1" :false-value="0">Socketed</label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label"><input class="form-check-input" type="checkbox"
            v-model.number="item.ethereal" :true-value="1" :false-value="0">Ethereal</label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label"><input class="form-check-input" type="checkbox"
            v-model.number="item.given_runeword" :true-value="1" :false-value="0">Runeword</label>
      </div>
    </div>
  </div>
  <div class="form-row" ref="moveItemErrors">
  </div>
  <div class="form-row" v-if="location">
    <div class="col-md-2">
      <label for="Location">Location</label>
      <select class="form-control" id="Location" v-model.number="location.location">
        <option v-for="l in locations" :value="l.key" :key="l.key">{{l.value}}</option>
      </select>
    </div>
    <div class="col-md-2" v-if="location.location == 1">
      <label for="EquippedLocation">Equipped Location</label>
      <select class="form-control" id="EquippedLocation" v-model.number="location.equipped_location">
        <option v-for="l in equipped_locations" :value="l.key" :key="l.key">{{l.value}}</option>
      </select>
    </div>
    <div class="col-md-2" v-if="location.location == 0">
      <label for="StorageLocation">Storage Location</label>
      <select class="form-control" id="StorageLocation" v-model.number="location.storage_page">
        <option v-for="l in storage_pages" :value="l.key" :key="l.key">{{l.value}}</option>
      </select>
    </div>
    <div class="col-md-2" v-if="location.location == 0">
      <label for="X">X</label>
      <input type="number" class="form-control" id="X" v-model.number="location.x">
    </div>
    <div class="col-md-2" v-if="location.location == 0">
      <label for="Y">Y</label>
      <input type="number" class="form-control" id="Y" v-model.number="location.y">
    </div>
    <div class="col-md-2">
      <label>&nbsp;</label>
      <button type="button" class="form-control btn btn-primary" @click="onMove">Move Item</button>
    </div>
  </div>
  <span v-if="!item.simple_item">
    <div class="form-row">
      <div class="col-md-6">
        <label for="Type">Type</label>
        <select class="form-control" id="Type" v-model="item.type" @change="onEvent('update')" v-select>
          <optgroup label="Armor">
            <option v-for="s in armor_items" :value="s[0]" :key="s[0]">{{s[1].n}}</option>
          </optgroup>
          <optgroup label="Weapons">
            <option v-for="s in weapon_items" :value="s[0]" :key="s[0]">{{s[1].n}}</option>
          </optgroup>
          <optgroup label="Misc">
            <option v-for="s in other_items" :value="s[0]" :key="s[0]">{{s[1].n}}</option>
          </optgroup>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-2">
        <label for="ILvl">Item Level</label>
        <input type="number" class="form-control" id="ILvl" v-model.number="item.level" @input="onEvent('update')">
      </div>
      <div class="col-md-2">
        <label for="Rarity">Rarity</label>
        <select class="form-control" id="Rarity" v-model.number="item.quality" @change="onEvent('update')">
          <option v-for="rarity in rarities" :value="rarity.key" :key="rarity.key">{{rarity.value}}</option>
        </select>
      </div>
      <div class="col-md-2" v-if="item.socketed">
        <label for="Sockets">Sockets</label>
        <input type="number" class="form-control" id="Sockets" v-model.number="item.total_nr_of_sockets"
          @input="onEvent('update')">
      </div>
    </div>
    <div class="form-row" v-if="item.quality == 4">
      <div class="col-md-3">
        <label for="Prefix">Prefix</label>
        <select class="form-control" id="Prefix" v-model.number="item.magic_prefix" @change="onEvent('update')">
          <option value="0">None</option>
          <option v-for="s in prefixes" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="Suffix">Suffix</label>
        <select class="form-control" id="Suffix" v-model.number="item.magic_suffix" @change="onEvent('update')">
          <option value="0">None</option>
          <option v-for="s in suffixes" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
    </div>
    <div class="form-row" v-if="item.quality == 6 || item.quality == 8">
      <div class="col-md-3">
        <label for="RareName1">Rare Name 1</label>
        <select class="form-control" id="RareName1" v-model.number="item.rare_name" @change="onEvent('update')">
          <option v-for="s in rare_names" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="RareName1">Rare Name 2</label>
        <select class="form-control" id="RareName1" v-model.number="item.rare_name2" @change="onEvent('update')">
        <option v-for="s in rare_names" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
    </div>
    <!-- crashes game -->
    <div class="form-row" v-if="false && item.quality == 5">
      <div class="col-md-3">
        <label for="SetName">Set Name</label>
        <select class="form-control" id="SetName" v-model.number="item.set_id" @change="onEvent('update')">
        <option v-for="s in set_items" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
    </div>
    <div class="form-row" v-if="false && item.quality == 7">
      <div class="col-md-3">
        <label for="UniqueName">Unique Name</label>
        <select class="form-control" id="UniqueName" v-model.number="item.unique_id" @change="onEvent('update')">
          <option v-for="s in unq_items" :value="s.i" :key="s.i">{{s.v.n}}</option>
        </select>
      </div>
    </div>

    <div v-if="item.magic_attributes">
      <div>Item Stats</div>
      <ItemStatsEditor :item-stats.sync="item.magic_attributes" @stat-change="onEvent('update')"></ItemStatsEditor>
    </div>
    <div v-if="item.runeword_attributes">
      <div>Runeword Stats</div>
      <ItemStatsEditor :item-stats.sync="item.runeword_attributes" @stat-change="onEvent('update')"></ItemStatsEditor>
    </div>
    <div v-if="item.set_attributes">
      <div v-for="(set_attribute, index) in item.set_attributes">
        <div>Set Stats List {{index}}</div>
        <ItemStatsEditor :item-stats.sync="set_attribute" @stat-change="onEvent('update')"></ItemStatsEditor>
      </div>
    </div>

    <div v-if="item.socketed_items">
      <div v-for="socketed_item in item.socketed_items">
        <ItemEditor ref="itemEditor" :item.sync="socketed_item" @item-event="onChildEvent"></ItemEditor>
      </div>
    </div>
  </span>
</div>
`,
name: 'ItemEditor',
props: {
  item: Object,
  location: Object,
},
components: {
  Item,
  ItemStatsEditor,
},
data() {
  return {
    rarities: [{ key: 1, value: 'Low' }, { key: 2, value: 'Normal' }, { key: 3, value: 'Superior' }, { key: 4, value: 'Magic' }, { key: 5, value: 'Set' }, { key: 6, value: 'Rare' }, { key: 7, value: 'Unique' }, { key: 8, value: 'Crafted' }],
    locations: [{ key: 0, value: 'Stored' }, { key: 1, value: 'Equipped' }, { key: 4, value: 'Cursor' }],
    equipped_locations: [{ key: 1, value: 'Head' }, { key: 2, value: 'Neck' }, { key: 3, value: 'Torso' }, { key: 4, value: 'Right Hand' }, { key: 5, value: 'Left Hand' }, { key: 6, value: 'Right Finger' }, { key: 7, value: 'Left Finger' }, { key: 8, value: 'Waist' }, { key: 9, value: 'Boots' }, { key: 10, value: 'Gloves' }, { key: 11, value: 'Alternate Right Hand' }, { key: 12, value: 'Alternate Left Hand' }],
    storage_pages: [{ key: 1, value: 'Inventory' }, { key: 4, value: 'Cube' }, { key: 5, value: 'Stash' }],
    prefixes: window.constants.constants.magic_prefixes.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    suffixes: window.constants.constants.magic_suffixes.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    rare_names: window.constants.constants.rare_names.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    unq_items: window.constants.constants.unq_items.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    set_items: window.constants.constants.set_items.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.n != null),
    armor_items: Object.entries(window.constants.constants.armor_items).filter(e => e[1].n != null),
    weapon_items: Object.entries(window.constants.constants.weapon_items).filter(e => e[1].n != null),
    other_items: Object.entries(window.constants.constants.other_items).filter(e => e[1].n != null),
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
    this.$emit('move-event', { item: this.item, location: this.location, type: 'move' });
  }
}
};