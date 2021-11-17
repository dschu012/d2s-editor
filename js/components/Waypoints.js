import html from '../html.js';

const waypoints = [
  {
    key: "act_i", label: "Act I", all: false,
    waypoints: [
      { key: "rogue_encampement", label: "Rogue Encampement" },
      { key: "cold_plains", label: "Cold Plains" },
      { key: "stony_field", label: "Stoney Field" },
      { key: "dark_woods", label: "Dark Woods" },
      { key: "black_marsh", label: "Black Marsh" },
      { key: "outer_cloister", label: "Outer Cloister" },
      { key: "jail_lvl_1", label: "Jail Lvl 1" },
      { key: "inner_cloister", label: "Inner Cloister" },
      { key: "catacombs_lvl_2", label: "Catacombs Lvl 2" },
    ]
  },
  {
    key: "act_ii", label: "Act II", all: false,
    waypoints: [
      { key: "lut_gholein", label: "Lut Gholein" },
      { key: "sewers_lvl_2", label: "Sewers Lvl 2" },
      { key: "dry_hills", label: "Dry Hills" },
      { key: "halls_of_the_dead_lvl_2", label: "Halls of the Dead Lvl 2" },
      { key: "far_oasis", label: "Far Oasis" },
      { key: "lost_city", label: "Lost City" },
      { key: "palace_cellar_lvl_1", label: "Palace Cellar Lvl 1" },
      { key: "arcane_sanctuary", label: "Arcane Sanctuary" },
      { key: "canyon_of_the_magi", label: "Canyon of the Magi" },
    ]
  },
  {
    key: "act_iii", label: "Act III", all: false,
    waypoints: [
      { key: "kurast_docks", label: "Kurast Docks" },
      { key: "spider_forest", label: "Spider Forest" },
      { key: "great_marsh", label: "Great Marsh" },
      { key: "flayer_jungle", label: "Flayer Jungle" },
      { key: "lower_kurast", label: "Lower Kurast" },
      { key: "kurast_bazaar", label: "Kurast Bazaar" },
      { key: "upper_kurast", label: "Upper Kurast" },
      { key: "travincal", label: "Travincal" },
      { key: "durance_of_hate_lvl_2", label: "Durance of Hate Lvl 2" },
    ]
  },
  {
    key: "act_iv", label: "Act IV", all: false,
    waypoints: [
      { key: "the_pandemonium_fortress", label: "Pandemonium Fortress" },
      { key: "city_of_the_damned", label: "City of the Damned" },
      { key: "river_of_flame", label: "River of Flame" },
    ]
  },
  {
    key: "act_v", label: "Act V", all: false,
    waypoints: [
      { key: "harrogath", label: "Harrogath" },
      { key: "frigid_highlands", label: "Frigid Highlands" },
      { key: "arreat_plateau", label: "Arreat Plateau" },
      { key: "crystalline_passage", label: "Crystalline Passage" },
      { key: "halls_of_pain", label: "Halls of Pain" },
      { key: "glacial_trail", label: "Glacial Trail" },
      { key: "frozen_tundra", label: "Frozen Tundra" },
      { key: "the_ancients_way", label: "The Ancients' Way" },
      { key: "worldstone_keep_lvl_2", label: "Worldstone Keep Lvl 2" },
    ]
  },
];

export default {
  template: html`
<div class="form-row">
  <div class="col-md-4" v-for="(difficulty, i) in difficulties" :key="i">
    <ul>
      <li><label><input class="form-check-input" type="checkbox" @input="updateDiff(difficulty)" v-model="difficulty.all" :key="difficulty.key"/>{{difficulty.label}}</label></li>
      <ul class="col-md-offset-1" v-for="(act, j) in difficulty.acts" :key="j">
        <li><label><input class="form-check-input" type="checkbox" @input="updateAct(difficulty, act)" v-model="act.all" :key="act.key"/>{{ act.label }}</label></li>
        <ul class="col-md-offset-2" v-for="(waypoint, k) in act.waypoints" :key="j">
          <li><label><input class="form-check-input" type="checkbox" @input="updateWP(difficulty, act, waypoint)" v-model="save.header.waypoints[difficulty.key][act.key][waypoint.key]" :key="waypoint.key"/>{{ waypoint.label }}</label></li>
        </ul>
      </ul>
    </ul>
  </div>
</div>
`,
  props: {
    save: Object,
  },
  methods: {
    updateWP(difficulty, act, wp) {
      const value = !this.save.header.waypoints[difficulty.key][act.key][wp.key];
      if(value !== act.all && act.all) {
        act.all = false;
      }
      if(value !== difficulty.all && difficulty.all) {
        difficulty.all = false;
      }
    },
    updateAct(difficulty, act) {
      for (const wp of act.waypoints) {
        this.save.header.waypoints[difficulty.key][act.key][wp.key] = !act.all;
      }
    },
    updateDiff(difficulty) {
      for (const act of difficulty.acts) {
        if (!act.all && difficulty.all) {
          act.all = true;
        } else if (act.all && !difficulty.all) {
          act.all = false;
        }
        this.updateAct(difficulty, act);
        act.all = !difficulty.all;
      }
    },
  },
  data() {
    return {
      difficulties: [
        { key: 'normal', all: false, label: "Normal", acts: JSON.parse(JSON.stringify(waypoints)) },
        { key: 'nm', all: false, label: "Nightmare", acts: JSON.parse(JSON.stringify(waypoints)) },
        { key: 'hell', all: false, label: "Hell", acts: JSON.parse(JSON.stringify(waypoints)) }
      ],
    };
  }
};
