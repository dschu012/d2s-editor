<template>
  <div>
    <div v-for="(stat, statIdx) in itemStats" :key="statIdx" class="form-row">
      <div class="col-md-4">
        <div class="form-row">
          <div class="col-md-1">
            <button type="button" class="btn btn-link red" @click="removeStat(statIdx)">&times;</button>
          </div>
          <div class="col-md-11">
            <multiselect v-model.number="stat.id" :options="stats_options" :searchable="true" :canDeselect="false" :canClear="false" :required="true" @update:model-value="onItemModified"/>
          </div>
        </div>
      </div>

      <div v-for="valIdx in numValues(stat.id)" class="col-md-2">
        <template v-if="isClass(stat.id, valIdx)">
          <multiselect v-model.number="stat.values[valIdx-1]" :options="classes.map(charClass => ({value: charClass.id, label: charClass.co}))" :searchable="true" :canDeselect="false" :canClear="false" @update:model-value="onItemModified"/>
        </template>
        <template v-else-if="isClassSkill(stat.id, valIdx)">
          <multiselect v-model.number="stat.values[valIdx-1]" :options="[0, 1, 2].map(idx2 => ({value: idx2, label: classes[stat.values[valIdx]].ts[idx2]}))" :searchable="true" :canDeselect="false" :canClear="false" @update:model-value="onItemModified"/>
        </template>
        <template v-else-if="isSkill(stat.id, valIdx)">
          <multiselect v-model.number="stat.values[valIdx-1]" :options="skills_options" :searchable="true" :canDeselect="false" :canClear="false" @update:model-value="onItemModified"/>
        </template>
        <input type="number" class= "edit-box" :min="getMinValue(stat.id)" :max="getMaxValue(stat.id)" @input="changeStatValue(stat.id, stat.values, valIdx-1)"
          :id="id + 'Stat' + statIdx + 'Index'+ valIdx" v-model.number="stat.values[valIdx-1]" v-else>
      </div>
    </div>
    
    <div class="form-row">
      <button type="button" class="btn btn-link" @click="addNewStat">Add Stat</button>
    </div>
  </div>
</template>

<script>
import utils from '../../utils.js';

export default {
  props: {
    id: String,
    itemStats: Array,
    disabled: Boolean,
  },
  data() {
    return {
      stats: window.constants.magical_properties,
      stats_options: window.constants.magical_properties
        .filter(stat => stat && stat.s)
        .map(stat => ({value: stat.id, label: stat.s, desc: stat.dP || ""})),
      skills_options: window.constants.skills
        .filter((skill) => skill && skill.s)
        .map((skill) => ({ value: skill.id, label: `${skill.s}${skill.id > 5 && !skill.c ? " (item)" : ""}` }))
        .sort((a, b) => { return a.label.localeCompare(b.label) }),
      classes: window.constants.classes,
    }
  },
  methods: {
    onItemModified() {
      for (let i = 0; i < this.itemStats.length; i++) {
        let numVal = this.numValues(this.itemStats[i].id)
        if (numVal != this.itemStats[i].values.length) {
          this.itemStats[i].values = [1, 0, 1].slice(0, numVal)
        }
      }
      this.$emit('stat-change', this.itemStats)
    },
    getMaxValue(id) {
      let stat = this.stats[id];
      let add = stat.sA ? stat.sA : 0;
      return utils.shift(1, stat.sB) - 1 - add;
    },
    getMinValue(id) {
      //for the stat to be present need value > 0
      let stat = this.stats[id];
      let add = stat.sA ? stat.sA : 0;
      return -add;
    },
    changeStatValue(id, values, idx) {
      let maxValue = this.getMaxValue(id),
        minValue = this.getMinValue(id);
      if (values[idx] > maxValue) {
        values[idx] = maxValue;
      } else if (values[idx] < minValue) {
        values[idx] = minValue;
      }
      //"item_maxdamage_percent"
      if (id == 17) values[idx + 1] = values[idx];

      this.onItemModified();
    },
    addNewStat() {
      //this.itemStats.push({ id: 0, values: [0, 0] });
      this.itemStats.push({ id: 0, values: [1, 0, 1] });
      this.onItemModified();
    },
    removeStat(idx) {
      this.itemStats.splice(idx, 1);
      this.onItemModified();
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
      if (stat.np) {
        return stat.np
      }
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
}  
</script>