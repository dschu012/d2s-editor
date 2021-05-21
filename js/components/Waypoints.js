import html from '../html.js';

const waypoints = [
  {
    key: "act_i", label: "Act I",
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
    key: "act_ii", label: "Act II",
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
    key: "act_iii", label: "Act III",
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
    key: "act_iv", label: "Act IV",
    waypoints: [
      { key: "the_pandemonium_fortress", label: "Pandemonium Fortress" },
      { key: "city_of_the_damned", label: "City of the Damned" },
      { key: "river_of_flame", label: "River of Flame" },
    ]
  },
  {
    key: "act_v", label: "Act V",
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
  <div class="col-md-4" v-for="difficulty in difficulties">
    <ul>
      <li><label>{{difficulty.label}}</label></li>
      <ul class="col-md-offset-1" v-for="act in difficulty.acts">
        <li><label>{{ act.label }}</label></li>
        <ul class="col-md-offset-2" v-for="waypoint in act.waypoints">
          <li><label><input class="form-check-input" type="checkbox" v-model="save.header.waypoints[difficulty.key][act.key][waypoint.key]">{{ waypoint.label }}</label></li>
        </ul>
      </ul>
    </ul>
  </div>
</div>
`,
  props: {
    save: Object,
  },
  data() {
    return {
      difficulties: [
        { key: 'normal', label: "Normal", acts: JSON.parse(JSON.stringify(waypoints)) }, 
        { key: 'nm', label: "Nightmare", acts: JSON.parse(JSON.stringify(waypoints)) }, 
        { key: 'hell', label: "Hell", acts: JSON.parse(JSON.stringify(waypoints)) }
      ],
    };
  }
};