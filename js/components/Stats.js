import html from '../html.js';

function shift(number, shift) {
  return number * Math.pow(2, shift);
}

export default {
  template: html`
<div>
  <div class="form-group mt-2">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Character Name" v-model="save.header.name" required>
  </div>
  <div class="form-row">
    <div class="col-md-2">
      <label for="Level">Level</label>
      <input type="number" class="form-control" id="Level" v-model.number="save.attributes.level" :min="min(12)"
        :max="max(12)" @input="change(12, save.attributes, 'level')">
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-2">
      <label for="Life">Life</label>
      <div class="input-group">
        <input class="form-control" type="number" id="Life" v-model.number="save.attributes.current_hp" :min="min(6)"
          :max="max(6)" @input="change(6, save.attributes, 'current_hp')">
        <div class="input-group-prepend input-group-append">
          <div class="input-group-text">/</div>
        </div>
        <input class="form-control" type="number" id="MaxLife" v-model.number="save.attributes.max_hp" :min="min(7)"
          :max="max(7)" @input="change(7, save.attributes, 'max_hp')">
      </div>
    </div>
    <div class="col-md-2">
      <label for="Mana">Mana</label>
      <div class="input-group">
        <input class="form-control" type="number" id="Mana" v-model.number="save.attributes.current_mana" :min="min(8)"
          :max="max(8)" @input="change(8, save.attributes, 'current_mana')">
        <div class="input-group-prepend input-group-append">
          <div class="input-group-text">/</div>
        </div>
        <input class="form-control" type="number" id="MaxMana" v-model.number="save.attributes.max_mana" :min="min(9)"
          :max="max(9)" @input="change(9, save.attributes, 'max_mana')">
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-2">
      <label for="Strength">Strength</label>
      <input type="number" class="form-control" id="Strength" v-model.number="save.attributes.strength" :min="min(0)"
        :max="max(0)" @input="change(0, save.attributes, 'strength')">
    </div>
    <div class="col-md-2">
      <label for="Dexterity">Dexterity</label>
      <input type="number" class="form-control" id="Dexterity" v-model.number="save.attributes.dexterity" :min="min(2)"
        :max="max(2)" @input="change(2, save.attributes, 'dexterity')">
    </div>
    <div class="col-md-2">
      <label for="Vitality">Vitality</label>
      <input type="number" class="form-control" id="Vitality" v-model.number="save.attributes.vitality" :min="min(3)"
        :max="max(3)" @input="change(3, save.attributes, 'vitality')">
    </div>
    <div class="col-md-2">
      <label for="Energy">Energy</label>
      <input type="number" class="form-control" id="Energy" v-model.number="save.attributes.energy" :min="min(1)"
        :max="max(1)" @input="change(1, save.attributes, 'energy')">
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-2">
      <label for="UnusedStatPoints">Unused Stat Points</label>
      <input type="number" class="form-control" id="UnusedStatPoints" v-model.number="save.attributes.unused_stats"
        :min="min(4)" :max="max(4)" @input="change(4, save.attributes, 'unused_stats')">
    </div>
    <div class="col-md-2">
      <label for="UnusedSkillPoints">Unused Skilled Points</label>
      <input type="number" class="form-control" id="UnusedSkillPoints"
        v-model.number="save.attributes.unused_skill_points" :min="min(5)" :max="max(5)"
        @input="change(5, save.attributes, 'unused_skill_points')">
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-2">
      <label for="Gold">Gold</label>
      <input type="number" class="form-control" id="Gold" v-model.number="save.attributes.gold" :min="min(14)"
        :max="max(14)" @input="change(14, save.attributes, 'gold')">
    </div>
    <div class="col-md-2">
      <label for="StashedGold">Stashed Gold</label>
      <input type="number" class="form-control" id="StashedGold" v-model.number="save.attributes.stashed_gold"
        :min="min(15)" :max="max(15)" @input="change(15, save.attributes, 'stashed_gold')">
    </div>
  </div>
</div>
`,
  props: {
    save: Object,
  },
  data() {
    return {
      stats: window.constants.constants.magical_properties,
    }
  },
  methods: {
    max(id) {
      let stat = this.stats[id];
      let s = shift(1, stat.cB) - 1;
      if (stat.vS) {
        s = Math.floor(shift(s, -stat.vS))
      }
      return s;
    },
    min(id) {
      return 0;
    },
    change(id, values, idx) {
      let maxValue = this.max(id),
        minValue = this.min(id);
      if (values[idx] > maxValue) {
        values[idx] = maxValue;
      } else if (values[idx] < minValue) {
        values[idx] = minValue;
      }
      if (id == 12) {
        this.save.header.level = values[idx];
        this.save.attributes.experience = xp[values[idx] - 1];
      }
    },
  }
};