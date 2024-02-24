<template>
  <div>
    <div class="form-row" v-for="(stat, statIdx) in itemStats" :key="statIdx">
      <div class="col-md-4">
        <div class="form-row">
          <div class="col-md-1"><button type="button" class="btn btn-link red" @click="remove(statIdx)">&times;</button>
          </div>
          <div class="col-md-11">
            <select2 :id="id + 'Stat' + statIdx" v-model.number="stat.id" @change="onChange">
              <option v-for="it in stats_map" :value="it.i" :key="it.i">{{ it.v.s }}</option>
              <!-- <option v-for="it in stats_map" :value="it.i" :key="it.i">{{it.i}} - {{it.v.s}} - [{{it.v.dP}}]</option> -->
            </select2>
          </div>
        </div>
      </div>

      <div class="col-md-2" v-for="idx in numValues(stat.id)">
        <select2 class="edit-box" :id="id + 'Stat' + statIdx + 'Index'+ idx" v-model.number="stat.values[idx-1]"
          v-if="isClass(stat.id, idx)" @change="onChange">
          <option v-for="(it, i) in classes" :value="i" :key="i">{{it.co}}</option>
        </select2>
        <select2 class="edit-box" :id="id + 'Stat' + statIdx + 'Index'+ idx" v-model.number="stat.values[idx-1]"
          v-else-if="isClassSkill(stat.id, idx)" @change="onChange">
          <option v-for="(it, i) in classes[stat.values[idx]].ts" :value="i" :key="i">{{it}}</option>
        </select2>
        <select2 class="edit-box" :id="id + 'Stat' + statIdx + 'Index'+ idx" v-model.number="stat.values[idx-1]"
          v-else-if="isSkill(stat.id, idx)" @change="onChange">
          <option v-for="it in skills" :value="it.i" :key="it.i">{{it.v.s}}</option>
        </select2>
        <input type="number" class= "edit-box" :min="min(stat.id)" :max="max(stat.id)" @input="change(stat.id, stat.values, idx-1)"
          :id="id + 'Stat' + statIdx + 'Index'+ idx" v-model.number="stat.values[idx-1]" v-else>
      </div>
    </div>
    
    <div class="form-row">
      <button type="button" class="btn btn-link" @click="add">Add Stat</button>
    </div>
  </div>
</template>

<script>
import utils from '../../utils.js';

export default {
  props: {
    id: String,
    itemStats: Array
  },
  data() {
    return {
      stats: window.constants.magical_properties,
      stats_map: window.constants.magical_properties.map((e, i) => { return { i: i, v: e } }).filter(e => e.v != null && e.v.s != null),
      skills: window.constants.skills.map((e, i) => { return { i: i, v: e } }).filter(e => e.v != null && e.v.s != null).sort((a, b) => { return a.v.s.localeCompare(b.v.s) }),
      classes: window.constants.classes,
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
      //"item_maxdamage_percent"
      if (id == 17)
        values[idx + 1] = values[idx];

      this.onChange();
    },
    add() {
      //this.itemStats.push({ id: 0, values: [0, 0] });
      this.itemStats.push({ id: 0, values: [1, 0, 1] });
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
</script>