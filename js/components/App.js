import Item from './inventory/Item.js';
import Stats from './Stats.js';
import Waypoints from './Waypoints.js';
import Quests from './Quests.js';
import Skills from './Skills.js';
import Equipped from './inventory/Equipped.js';
import Grid from './inventory/Grid.js';
import Mercenary from './Mercenary.js';
import ItemEditor from './inventory/ItemEditor.js';

import ItemPack from '../d2/ItemPack.js';
import CharPack from '../d2/CharPack.js';

import html from '../html.js';

const colormaps = {
  1: 'data/global/items/Palette/grey.dat',
  2: 'data/global/items/Palette/grey2.dat',
  5: 'data/global/items/Palette/greybrown.dat',
  6: 'data/global/items/Palette/invgrey.dat',
  7: 'data/global/items/Palette/invgrey2.dat',
  8: 'data/global/items/Palette/invgreybrown.dat',
};

const colors = {
  whit: 0,
  lgry: 1,
  dgry: 2,
  blac: 3,
  lblu: 4,
  dblu: 5,
  cblu: 6,
  lred: 7,
  dred: 8,
  cred: 9,
  lgrn: 10,
  dgrn: 11,
  cgrn: 12,
  lyel: 13,
  dyel: 14,
  lgld: 15,
  dgld: 16,
  lpur: 17,
  dpur: 18,
  oran: 19,
  bwht: 20,
};

function b64ToArrayBuffer(base64) {
  var bin = window.atob(base64);
  var len = bin.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes.buffer;
}

async function b64PNGFromDC6(item) {
  const response = await fetch(`data/global/items/${item.inv_file}.dc6`);
  if (response.status !== 200) {
    return null;
  }
  const dc6 = new Uint8Array(await response.arrayBuffer());
  let idx = 32;
  const width = dc6[idx] | dc6[idx + 1] << 8 | dc6[idx + 2] << 16 | dc6[idx + 2] << 24;
  idx = 36;
  const height = dc6[idx] | dc6[idx + 1] << 8 | dc6[idx + 2] << 16 | dc6[idx + 2] << 24;
  idx = 56;
  const length = dc6[idx] | dc6[idx + 1] << 8 | dc6[idx + 2] << 16 | dc6[idx + 2] << 24;
  let x = 0, y = height - 1;
  const indexed = [];
  if (width == 0 || height == 0) {
    return null;
  }
  for (let i = 0; i < height; i += 1) {
    indexed[i] = Array(width).fill(255);
  }
  for (let i = 0; i < length;) {
    let b = dc6[60 + i++];
    if (b === 0x80) { //eol
      x = 0, y--;
    } else if (b & 0x80) {
      x += b & 0x7F; //transparent repeat for N bytes
    } else {
      //read N bytes
      for (let j = 0; j < b; j++) {
        indexed[y][x++] = dc6[60 + i++];
      }
    }
  }
  let canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    data = context.createImageData(width, height);
  canvas.height = height;
  canvas.width = width;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let paletteIdx = indexed[y][x];
      const offset = (y * width + x) * 4;
      if (paletteIdx === 255) { //transparent
        continue;
      }
      if (item.transform_color && item.inv_transform) {
        let transformIdx = colors[item.transform_color];
        if (transformIdx >= 0 && window.palettes[item.inv_transform]) {
          paletteIdx = window.palettes[item.inv_transform][transformIdx][paletteIdx];
        }
      }
      const rgb = window.palettes["ACT1"][paletteIdx];
      data.data[offset] = rgb[0];
      data.data[offset + 1] = rgb[1];
      data.data[offset + 2] = rgb[2];
      data.data[offset + 3] = 255;
    }
  }

  // put data to context at (0, 0)
  context.putImageData(data, 0, 0);

  // output image
  var img = new Image();
  var src = canvas.toDataURL('image/png');
  canvas.remove();
  return src;
};

const navbar = html`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="octicon octicon-clippy navbar-brand">
    <i class="fa fa-fw fa-github"></i>
    <a href="https://github.com/dschu012">dschu012</a> / <a class="font-weight-bold"
      href="https://github.com/dschu012/d2s">d2s</a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>`;

const addItemModal = html`
<div class="modal" tabindex="-1" role="dialog" id="LoadItem">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Select an Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row d-flex justify-content-center mt-3 pl-5 pr-5">
          <Item v-if="preview" :item="preview" clazz="item-edit"></Item>
        </div>
        <label for="Item">Item</label>
        <select class="form-control" v-model="previewModel" @change="previewItem" v-select="'#LoadItem'">
          <option v-for="item in itempack" :value="item" :key="item.key">{{item.key}}</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="loadItem" data-dismiss="modal">Load</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

const mainContent = html`
<div class="row">
  <div class="col-2 d-none d-md-block"></div>
  <div class="col-8 mt-2">
    <div class="card bg-light">
      <div class="card-body">
        <div class="alert alert-primary" role="alert">
          This editor is still a work in progress. Some things may not work. Found a bug? <a
            href="https://github.com/dschu012/d2s/issues/new">Report it.</a>
        </div>
        <form id="d2sForm">
          <fieldset>
            <div class="form-group">
              <div class="input-group">
                <div class="custom-file">
                  <input type="file" name="d2sFile" @change="onFileChange" id="d2sFile">
                  <label class="custom-file-label" for="d2sFile">*.d2s</label>
                </div>
                <div>
                  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">Create
                    New</button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <button class="dropdown-item" type="button" @click="newChar(0)">Amazon</button>
                    <button class="dropdown-item" type="button" @click="newChar(1)">Sorceress</button>
                    <button class="dropdown-item" type="button" @click="newChar(2)">Necromancer</button>
                    <button class="dropdown-item" type="button" @click="newChar(3)">Paladin</button>
                    <button class="dropdown-item" type="button" @click="newChar(4)">Barbarian</button>
                    <button class="dropdown-item" type="button" @click="newChar(5)">Druid</button>
                    <button class="dropdown-item" type="button" @click="newChar(6)">Assassin</button>
                  </div>
                </div>
                <div class="input-group-append"><span>&nbsp;</span></div>
              </div>
            </div>
            <div v-if="save != null">
              <ul class="nav nav-tabs" id="tabs">
                <li class="nav-item">
                  <a class="nav-link active" id="stats-tab" data-toggle="tab" data-target="#stats-content" role="tab"
                    type="button">Stats</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="waypoints-tab" data-toggle="tab" data-target="#waypoints-content" role="tab"
                    type="button">Waypoints</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="quests-tab" data-toggle="tab" data-target="#quests-content" role="tab"
                    type="button">Quests</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="skills-tab" data-toggle="tab" data-target="#skills-content" role="tab"
                    type="button">Skills</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" id="items-tab" data-toggle="tab" data-target="#items-content" role="tab"
                    type="button">Items</a>
                </li>

              </ul>
              <div class="tab-content" id="tabs-content">
                <div class="tab-pane show active" id="stats-content" role="tabpanel">
                  <Stats v-bind:save.sync="save" />
                </div>
                <div class="tab-pane" id="waypoints-content" role="tabpanel">
                  <Waypoints v-bind:save.sync="save" />
                </div>
                <div class="tab-pane" id="quests-content" role="tabpanel">
                  <Quests v-bind:save.sync="save" />
                </div>
                <div class="tab-pane" id="skills-content" role="tabpanel">
                  <Skills v-bind:save.sync="save" />
                </div>
                <div class="tab-pane" id="items-content" role="tabpanel">
                  <div v-for="(notification, idx) in notifications" :key="idx" :class="notification.alert" role="alert">
                    {{ notification.message }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="row d-flex justify-content-between mt-3 pl-5 pr-5">
                    <div></div>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 1 }"
                        @click="changeTab(1)">Equipped</button>
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 2 }"
                        @click="changeTab(2)">Inventory</button>
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 3 }"
                        @click="changeTab(3)">Stash</button>
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 4 }"
                        @click="changeTab(4)">Cube</button>
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 5 }"
                        @click="changeTab(5)">Mercenary</button>
                      <button type="button" class="btn btn-secondary" :class="{ active: activeTab == 6 }"
                        @click="changeTab(6)">All</button>
                    </div>
                    <div>
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"></button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <div class="p-3 form-group">
                          <div class="form-row">
                            <div class="col-md-12">
                              <label>Inventory</label>
                              <div class="input-group">
                                <input type="number" min="1" max="20" class="form-control" v-model.number="grid.inv.w"
                                  @input="gridChange">
                                <div class="input-group-prepend input-group-append">
                                  <div class="input-group-text">,</div>
                                </div>
                                <input type="number" min="1" max="20" class="form-control" v-model.number="grid.inv.h"
                                  @input="gridChange">
                              </div>
                            </div>
                          </div>
                          <div class="form-row">
                            <div class="col-md-12">
                              <label>Stash</label>
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
                          <div class="form-row">
                            <div class="col-md-12">
                              <label>Cube</label>
                              <div class="input-group">
                                <input type="number" min="1" max="20" class="form-control" v-model.number="grid.cube.w"
                                  @input="gridChange">
                                <div class="input-group-prepend input-group-append">
                                  <div class="input-group-text">,</div>
                                </div>
                                <input type="number" min="1" max="20" class="form-control" v-model.number="grid.cube.h"
                                  @input="gridChange">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn btn-primary" :disabled="!selected"
                        @click="copy(selected)">Copy</button>
                      <button type="button" class="btn btn-primary" :disabled="!clipboard"
                        @click="paste()">Paste</button>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#LoadItem">Load
                        Item</button>
                    </div>
                  </div>
                  <Equipped v-if="activeTab == 1 || activeTab == 6" :items.sync="equipped" @item-selected="onSelect">
                  </Equipped>
                  <Grid v-if="activeTab == 2 || activeTab == 6" :width="grid.inv.w" :height="grid.inv.h"
                    :items.sync="inventory" @item-selected="onSelect"></Grid>
                  <Grid v-if="activeTab == 3 || activeTab == 6" :width="grid.stash.w" :height="grid.stash.h"
                    :items.sync="stash" @item-selected="onSelect"></Grid>
                  <Grid v-if="activeTab == 4 || activeTab == 6" :width="grid.cube.w" :height="grid.cube.h"
                    :items.sync="cube" @item-selected="onSelect">
                  </Grid>
                  <Mercenary v-if="activeTab == 5 || activeTab == 6" :items.sync="mercenary" @item-selected="onSelect">
                  </Mercenary>
                  <ItemEditor v-if="selected" :item.sync="selected" ref="editor" @item-changed="onChanged"></ItemEditor>
                </div>
              </div>
            </div>
          </fieldset>
          <div id="errors">
          </div>
          <br />
          <div v-if="save != null">
            <button type="button" @click="unlockHell" class="btn btn-primary">Unlock Hell</button>
            <button type="button" @click="unlockAllWPs" class="btn btn-primary">Unlock All WPs</button>
            <button type="button" @click="setLvl99" class="btn btn-primary">Set Level 99</button>
            <button type="button" @click="setAllSkills20" class="btn btn-primary">Set All Skills 20</button>
            <br /><br />
            <button type="button" id="d2" class="btn btn-primary" @click="saveFile(0x60)">Save D2</button>
            <button type="button" id="d2r" class="btn btn-primary" @click="saveFile(0x61)">Save D2R</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
`;

export default {
  template: html`
<div>
  ${navbar}
  ${addItemModal}
  <div class="container-fluid">
    ${mainContent}
  </div>
</div>
`
  ,
  components: {
    Item,
    Stats,
    Waypoints,
    Quests,
    Skills,
    Equipped,
    Grid,
    Mercenary,
    ItemEditor
  },
  data() {
    return {
      save: null,
      activeTab: 1,
      selected: null,
      itempack: ItemPack,
      previewModel: null,
      preview: null,
      clipboard: null,
      load: null,
      notifications: [],
      grid: { inv: { w: 10, h: 4 }, stash: { w: 10, h: 10 }, cube: { w: 3, h: 4 } }
    };
  },
  async mounted() {
    if (window.d2s === undefined) {
      let s = document.createElement('script');
      s.src = "https://github.com/dschu012/d2s/releases/latest/download/constants.bundle.min.js";
      document.querySelector('body').appendChild(s);
      s = document.createElement('script');
      s.src = "https://github.com/dschu012/d2s/releases/latest/download/d2s.bundle.min.js";
      document.querySelector('body').appendChild(s);
    }
    if (window.palettes == undefined) {
      window.palettes = {};
      window.palettes["ACT1"] = [];
      let response = await fetch(`data/global/palette/ACT1/pal.dat`);
      let buffer = new Uint8Array(await response.arrayBuffer());
      for (let i = 0; i < 256; i += 1) {
        window.palettes["ACT1"].push([buffer[i * 3 + 2], buffer[i * 3 + 1], buffer[i * 3]]);
      }
      for (const [k, v] of Object.entries(colormaps)) {
        response = await fetch(v);
        buffer = new Uint8Array(await response.arrayBuffer());
        window.palettes[k] = [];
        for (let i = 0; i < Object.keys(colors).length; i += 1) {
          window.palettes[k].push(buffer.slice(0 + (i * 256), 256 + (i * 256)));
        }
      }
    }
    if (localStorage.grid) {
      this.grid = JSON.parse(localStorage.getItem('grid'));
    }
  },
  filters: {
  },
  computed: {
    equipped() {
      return this.save.items.filter(
        item => item.location_id === 1,
      );
    },
    inventory() {
      return this.save.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 1,
      );
    },
    stash() {
      return this.save.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 5,
      );
    },
    cube() {
      return this.save.items.filter(
        item => item.location_id === 0 && item.alt_position_id === 4,
      );
    },
    mercenary() {
      return this.save.merc_items || [];
    },
  },
  methods: {
    gridChange() {
      localStorage.setItem('grid', JSON.stringify(this.grid));
    },
    changeTab(i) {
      this.activeTab = i;
    },
    onSelect(e) {
      this.selected = e;
      if (this.$refs.editor) this.$refs.editor.updateTarget(e);
    },
    onChanged(e) {
      d2s.enhanceItem(this.selected, window.constants.constants);
      this.setPropertiesOnItem(this.selected);
    },
    async previewItem(e) {
      let bytes = b64ToArrayBuffer(this.previewModel.value);
      this.preview = await d2s.readItem(bytes, 0x60, window.constants.constants);
      this.setPropertiesOnItem(this.preview);
    },
    loadItem() {
      this.paste(this.preview);
    },
    copy(item) {
      this.clipboard = JSON.parse(JSON.stringify(item));
    },
    paste(item) {
      let copy = JSON.parse(JSON.stringify(item != null ? item : this.clipboard));
      let pos = this.findSafeLocation(copy);
      copy.location_id = pos[0];
      copy.equipped_id = pos[1];
      copy.position_x = pos[2];
      copy.position_y = pos[3];
      copy.alt_position_id = pos[4];
      this.notifications = [];
      if (copy.location_id == 4) {
        this.notifications.push({ alert: "alert alert-warning", message: `Could not find safe location to place item. Placed in mouse buffer.` });
      } else {
        let loc = copy.alt_position_id == 1 ? 'inventory' : (copy.alt_position_id == 5 ? 'stash' : 'cube');
        this.notifications.push({ alert: "alert alert-info", message: `Loaded item in ${loc} at ${copy.position_x}, ${copy.position_y}` });
      }
      this.save.items.push(copy);
      this.selected = copy;
      if (this.$refs.editor) this.$refs.editor.updateTarget(copy);
    },
    findSafeLocation(item) {
      //inv = 1, cube = 4, stash = 5
      for (var i = 0; i < this.grid.inv.w; i++) {
        for (var j = 0; j < this.grid.inv.h; j++) {
          if (this.canPlaceItem(item, 1, i, j)) {
            return [0, 0, i, j, 1];
          }
        }
      }
      for (var i = 0; i < this.grid.stash.w; i++) {
        for (var j = 0; j < this.grid.stash.h; j++) {
          if (this.canPlaceItem(item, 5, i, j)) {
            return [0, 0, i, j, 5];
          }
        }
      }
      for (var i = 0; i < this.grid.cube.w; i++) {
        for (var j = 0; j < this.grid.cube.h; j++) {
          if (this.canPlaceItem(item, 4, i, j)) {
            return [0, 0, i, j, 4];
          }
        }
      }
      return [4, 0, 4, 0, 0];
    },
    canPlaceItem(item, loc, x, y) {
      var bounds;
      if (loc == 4) {
        bounds = this.grid.cube;
      } else if (loc == 5) {
        bounds = this.grid.stash;
      } else {
        bounds = this.grid.inv;
      }
      if ((x + item.inv_width) > bounds.w) {
        return false;
      }
      if ((y + item.inv_height) > bounds.h) {
        return false;
      }
      var rect = [x, y, x + item.inv_width, y + item.inv_height];
      let closeItems = this.save.items.filter(
        item => item.location_id === 0 && item.alt_position_id === loc,
      );
      for (var closeItem of closeItems) {
        var r = [closeItem.position_x, closeItem.position_y, closeItem.position_x + closeItem.inv_width, closeItem.position_y + closeItem.inv_height];
        if (this.contains(rect, r) || this.overlaps(rect, r)) {
          return false;
        }
      }
      return true;
    },
    contains(a, b) {
      return !(
        b[0] < a[0] ||
        b[1] < a[1] ||
        b[2] > a[2] ||
        b[3] > a[3]
      );
    },
    overlaps(a, b) {
      if (a[0] >= b[2] || b[0] >= a[2]) return false;
      if (a[1] >= b[3] || b[1] >= a[3]) return false;
      return true;
    },
    setPropertiesOnSave() {
      let that = this;
      [... this.save.items, ... this.save.merc_items, ... this.save.corpse_items, this.save.golem_item].forEach(item => {
        that.setPropertiesOnItem(item);
      });
    },
    setPropertiesOnItem(item) {
      if (!item) {
        return;
      }
      var that = this;
      if (!item.magic_attributes) item.magic_attributes = [];
      b64PNGFromDC6(item).then(src => item.src = src);
      if (!item.socketed_items) {
        return;
      }
      item.socketed_items.forEach(item => {
        b64PNGFromDC6(item).then(src => item.src = src);
      });
    },
    newChar(index) {
      let bytes = b64ToArrayBuffer(CharPack[index]);
      this.readBuffer(bytes);
    },
    onFileLoad(event) {
      this.readBuffer(event.target.result);
    },
    readBuffer(bytes) {
      let that = this;
      d2s.read(bytes, constants.constants).then(response => {
        that.save = response;
        that.setPropertiesOnSave();
      });
    },
    onFileChange(event) {
      let reader = new FileReader();
      reader.onload = this.onFileLoad;
      reader.readAsArrayBuffer(event.target.files[0]);
      event.target.value = null;
    },
    unlockHell() {
      for (var i of ["quests_normal", "quests_nm", "quests_hell"]) {
        for (var j of ["act_i", "act_ii", "act_iii", "act_iv", "act_v"]) {
          this.save.header[i][j].introduced = true;
          this.save.header[i][j].completed = true;
        }
        this.save.header[i].act_iii.the_guardian.is_completed = true;
        this.save.header[i].act_iv.terrors_end.is_completed = true;
      }
      for (var i of ["normal", "nm", "hell"]) {
        this.save.header.waypoints[i].act_i.rogue_encampement = true;
        this.save.header.waypoints[i].act_ii.lut_gholein = true;
        this.save.header.waypoints[i].act_iii.kurast_docks = true;
        this.save.header.waypoints[i].act_iv.the_pandemonium_fortress = true;
        this.save.header.waypoints[i].act_v.harrogath = true;
      }
    },
    unlockAllWPs() {
      for (var i of ["normal", "nm", "hell"]) {
        for (var a in this.save.header.waypoints[i]) {
          for (var w in this.save.header.waypoints[i][a]) {
            this.save.header.waypoints[i][a][w] = true;
          }
        }
      }
    },
    setLvl99() {
      let s = this.save.attributes.level;
      this.save.header.level = 99;
      this.save.attributes.experience = 3520485254;
      this.save.attributes.level = 99;
      this.save.attributes.unused_stats = ((99 - s) * 5);
    },
    setAllSkills20() {
      for (var s of this.save.skills) {
        s.points = 20;
      }
    },
    saveFile(version) {
      this.save.header.version = version;
      let link = document.createElement('a');
      let that = this;
      link.style.display = 'none';
      document.body.appendChild(link);
      d2s.write(this.save, constants.constants).then(function (response) {
        let blob = new Blob([response], { type: "octet/stream" });
        link.href = window.URL.createObjectURL(blob);
        link.download = that.save.header.name + '.d2s';
        link.click();
        link.remove();
      });
    }
  },
};