import utils from '../../utils.js';

import html from '../../html.js';

export default {
  template: html`
<div>
  <div class="form-row align-items-center">
    <div class="col-auto">
      <label class="form-label">Filter of Stat Selector</label>
    </div>
    <div class="col-auto">
      <input type="text" class="form-control" v-model="filterString"/>
    </div>
  </div>

  <div class="form-row">
    <div class="col-md-6">Stat</div>
    <div class="col-md-6">Value</div>
  </div>

  <div class="form-row align-items-center" v-for="(stat, statIdx) in itemStats" :key="statIdx">
    <div class="col-md-6">
      <div class="form-row align-items-center">
        <div class="col-2 col-md-1"><span class="text-danger" style="cursor: pointer" @click="remove(statIdx)">&times;</span>
        </div>
        <div class="col-10 col-md-1"><span class="small">{{statIdx}}</span></div>
        <div class="col-md-10">
          <select class="form-control" :id="id + 'Stat' + statIdx" v-model.number="stat.id" @change="onChange">
            <option v-for="(it, opIdx) in filteredStats(stat)" :value="it?.idx" :key="it?.idx" :disabled="it?.sB==null">{{descString(it)}}</option>
            <!-- ^ 1. make the option text more meaningful -->
            <!-- ^ 2. disable error options -->
          </select>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-row align-items-center">
        <div class="col" v-for="valIdx in numValues(stat.id)">
          <select class="form-control" :id="id + 'Stat' + statIdx + 'Index'+ valIdx" v-model.number="stat.values[valIdx-1]"
            v-if="isClass(stat.id, valIdx)" @change="onChange">
            <option v-for="(it, opIdx) in classes" :value="opIdx" :key="opIdx">{{it.co}}</option>
          </select>
          <select class="form-control" :id="id + 'Stat' + statIdx + 'Index'+ valIdx" v-model.number="stat.values[valIdx-1]"
            v-else-if="isClassSkill(stat.id, valIdx)" @change="onChange">
            <option v-for="(it, opIdx) in classes[stat.values[valIdx]].ts" :value="opIdx" :key="opIdx">{{it}}</option>
          </select>
          <select class="form-control" :id="id + 'Stat' + statIdx + 'Index'+ valIdx" v-model.number="stat.values[valIdx-1]"
            v-else-if="isSkill(stat.id, valIdx)" @change="onChange">
            <option v-for="it in skills" :value="it.i" :key="it.i">{{it?.v?.s}}</option>
          </select>
          <input type="number" class="form-control" :min="min(stat.id)" :max="max(stat.id)" @input="change(stat.id, stat.values, valIdx-1)"
            :id="id + 'Stat' + statIdx + 'Index'+ valIdx" v-model.number="stat.values[valIdx-1]" v-else>
        </div>
      </div>
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
    filterString: "",
    // ^ for filtering the stats

    stats: window.constants_99.constants.magical_properties.map((it,idx)=>(Object.assign(it??{}, {idx: idx}))),
    // ^
    // 1.add the `idx` property for convenience
    // 2.prevent `it` to be null

    // [Deprecated]
    // stats: window.constants_99.constants.magical_properties.filter(s => s != null && s.s != null),
    // ^ should not filler, because the original index is important!

    skills: window.constants_99.constants.skills.map((e, i) => { return {i:i, v:e} }).filter(e => e.v != null && e.v.s != null)
            .sort((a, b) => { return a.v.s.localeCompare(b.v.s) }),
    classes: window.constants_99.constants.classes,
  }
},

methods: {
  descString(it) {
    return `${it?.idx} - ${it.s} - [${it.dP}]`;
    // TODO: `${it.dF}` is also useful.
  },
  filteredStats(stat) {
    return this.stats.filter(it=>it?.idx==stat.id||this.descString(it).toLowerCase().includes(this.filterString));
  },
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
    if (this.stats[id].s == "item_maxdamage_percent") {
      values[idx+1] = values[idx];
    }
    this.onChange();
  },
  add() {
    this.itemStats.push({ id: 0, values: [0, 0, 0] });
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