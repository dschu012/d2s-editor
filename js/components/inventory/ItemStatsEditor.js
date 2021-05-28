import utils from '../../utils.js';

import html from '../../html.js';

export default {
  template: html`
<div>
  <div class="form-row">
    <div class="col-md-2">Stat</div>
    <div class="col-md-2">Value</div>
  </div>

  <div class="form-row" v-for="(s, statIdx) in itemStats" :key="statIdx">
    <div class="col-md-4">
      <div class="form-row">
        <div class="col-md-1"><button type="button" class="btn btn-link red" @click="remove(statIdx)">&times;</button>
        </div>
        <div class="col-md-11">
          <select class="form-control" :id="id + 'Stat' + statIdx" v-model.number="s.id" @change="onChange" v-select>
            <option v-for="(stat, idx) in stats" :value="idx" :key="idx">{{idx}} - {{stat.s}}</option>
          </select>
        </div>
      </div>
      <!-- <label :for="'Stat' + statIdx">Stat</label> -->
    </div>
    <div class="col-md-2" v-for="i in numValues(s.id)">
      <!-- <label :for="'Stat' + statIdx + 'Value'+ i">Value</label> -->
      <select class="form-control" :id="id + 'Stat' + statIdx + 'Value'+ i" v-model.number="s.values[i-1]"
        v-if="isClass(s.id, i)" @change="onChange" v-select>
        <option v-for="(c, idx) in classes" :value="idx" :key="idx">{{c.co}}</option>
      </select>
      <select class="form-control" :id="id + 'Stat' + statIdx + 'Value'+ i" v-model.number="s.values[i-1]"
        v-else-if="isClassSkill(s.id, i)" @change="onChange" v-select>
        <option v-for="(t, idx) in classes[s.values[i]].ts" :value="idx" :key="idx">{{t}}</option>
      </select>
      <select class="form-control" :id="id + 'Stat' + statIdx + 'Value'+ i" v-model.number="s.values[i-1]"
        v-else-if="isSkill(s.id, i)" @change="onChange" v-select>
        <option v-for="s in skills" :value="s.i" :key="s.i">{{s.v.s}}</option>
      </select>
      <input type="number" class="form-control" :min="min(s.id)" :max="max(s.id)" @input="change(s.id, s.values, i-1)"
        :id="id + 'Stat' + statIdx + 'Value'+ i" v-model.number="s.values[i-1]" v-else>
    </div>
  </div>
  <div class="form-row">
    <button type="button" class="btn btn-link" @click="add">Add Stat</button>
  </div>
</div>
`,
props: {
  id: String,
  itemStats: Array
},
data() {
  return {
    stats: window.constants.constants.magical_properties,
    skills: window.constants.constants.skills.map((e,i)=> { return { i:i, v:e }}).filter(e => e.v != null && e.v.s != null),
    classes: window.constants.constants.classes,
  }
},
methods: {
  onChange() {
    this.$emit('stat-change', this.itemStats);
  },
  max(id) {
    let stat = this.stats[id];
    let add = stat.sA ? stat.sA : 0;
    return utils.shift(1, stat.sB) - 1 - stat.sA;
  },
  min(id) {
    //for the stat to be present need value > 0
    let stat = this.stats[id];
    let add = stat.sA ? stat.sA : 0;
    return -add;
  },
  change(id, values, idx) {
    let maxValue = this.max(id),
      minValue = this.min(id);
    if (values[idx] > maxValue) {
      values[idx] = maxValue;
    } else if (values[idx] < minValue) {
      values[idx] = minValue;
    }
    this.onChange();
  },
  add() {
    this.itemStats.push({ id: 0, values: [] });
  },
  remove(idx) {
    this.itemStats.splice(idx, 1);
  },
  isClass(id, idx) {
    let stat = this.stats[id];
    if ((stat.dF == 14) && idx == 2) {
      return true;
    }
    if ((stat.dF == 13) && idx == 1) {
      return true;
    }
    return false;
  },
  isClassSkill(id, idx) {
    let stat = this.stats[id];
    if ((stat.dF == 14) && idx == 1) {
      return true;
    }
    return false;
  },
  isSkill(id, idx) {
    let stat = this.stats[id];
    if (stat.dF == 14) {
      return false;
    }
    if (stat.sP) {
      if (stat.e == 3 || stat.e == 2) {
        return idx == 2;
      } else {
        return idx == 1;
      }
    }
    return false;
  },
  numValues(id) {
    let stat = this.stats[id];
    if (stat.dF == 14 || stat.e == 2) {
      return 3;
    }
    if (stat.e == 3) {
      return 4;
    }
    if (stat.sP) {
      return 2;
    }
    return 1;
  }
}
};