import html from '../html.js';

export default {
  template: html`
<div class="form-row">
  <div class="col-md-4" v-for="difficulty in difficulties">
    <ul>
      <li><i class="fa fa-angle-right rotate"></i> {{difficulty.value}}</li>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act I</li>
        <ul class="col-md-offset-2">
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.rogue_encampement">Rogue Encampement</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.cold_plains">Cold Plains</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.stony_field">Stoney Field</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.dark_woods">Dark Woods</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.black_marsh">Black Marsh</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.outer_cloister">Outer Cloister</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.jail_lvl_1">Jail Lvl 1</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.inner_cloister">Inner Cloister</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_i.catacombs_lvl_2">Catacombs Lvl 2</label></li>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act II</li>
        <ul class="col-md-offset-2">
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.lut_gholein">Lut Gholein</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.sewers_lvl_2">Sewers Lvl 2</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.dry_hills">Dry Hills</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.halls_of_the_dead_lvl_2">Halls of the Dead Lvl
              2</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.far_oasis">Far Oasis</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.lost_city">Lost City</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.palace_cellar_lvl_1">Palace Cellar Lvl 1</label>
          </li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.arcane_sanctuary">Arcane Sanctuary</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_ii.canyon_of_the_magi">Canyon of the Magi</label>
          </li>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act III</li>
        <ul class="col-md-offset-2">
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.kurast_docks">Kurast Docks</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.spider_forest">Spider Forest</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.great_marsh">Great Marsh</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.flayer_jungle">Flayer Jungle</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.lower_kurast">Lower Kurast</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.kurast_bazaar">Kurast Bazaar</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.upper_kurast">Upper Kurast</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.travincal">Travincal</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_iii.durance_of_hate_lvl_2">Durance of Hate Lvl
              2</label></li>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act IV</li>
        <ul class="col-md-offset-2">
          <li><label><input class="form-check-input" type="checkbox"
                :checked="save.header.waypoints[difficulty.key].act_iv.the_pandemonium_fortress">Pandemonium
              Fortress</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                :checked="save.header.waypoints[difficulty.key].act_iv.city_of_the_damned">City of the Damned</label>
          </li>
          <li><label><input class="form-check-input" type="checkbox"
                :checked="save.header.waypoints[difficulty.key].act_iv.river_of_flame">River of Flames</label></li>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act V</li>
        <ul class="col-md-offset-2">
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.harrogath">Harrogath</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.frigid_highlands">Frigid Highlands</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.arreat_plateau">Arreat Plateau</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.crystalline_passage">Crystalline Passage</label>
          </li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.halls_of_pain">Halls of Pain</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.glacial_trail">Glacial Trail</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.frozen_tundra">Frozen Tundra</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.the_ancients_way">The Ancients' Way</label></li>
          <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header.waypoints[difficulty.key].act_v.worldstone_keep_lvl_2">Worldstone Keep Lvl
              2</label></li>
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
      difficulties: [{ key: 'normal', value: "Normal" }, { key: 'nm', value: "Nightmare" }, { key: 'hell', value: "Hell" }]
    };
  }
};