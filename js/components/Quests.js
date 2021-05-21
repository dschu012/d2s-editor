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
          <li><i class="fa fa-angle-right rotate"></i>Den of Evil</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.den_of_evil.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Sisters' Burial Grounds</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.sisters_burial_grounds.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Search for Cain</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.the_search_for_cain.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Forgotten Tower</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.the_forgotten_tower.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Tools of the Trade</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.tools_of_the_trade.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Sisters to the Slaughter</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_i.sisters_to_the_slaughter.is_completed">Completed</label></li>
          </ul>
        </ul>
      </ul>

      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act II</li>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Radament's Lair</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.radaments_lair.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Horadric Staff</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.the_horadric_staff.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Tainted Sun</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.tainted_sun.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Arcane Sanctuary</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.arcane_sanctuary.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Summoner</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.the_summoner.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Seven Tombs</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_ii.the_seven_tombs.is_completed">Completed</label></li>
          </ul>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act III</li>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Golden Bird</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.the_golden_bird.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Blade of the Old Religion</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.blade_of_the_old_religion.is_completed">Completed</label>
            </li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Khalim's Will</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.khalims_will.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Lam Esen's Tome</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.lam_esens_tome.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Blackened Temple</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.the_blackened_temple.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>The Guardian</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iii.the_guardian.is_completed">Completed</label></li>
          </ul>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act IV</li>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Fallen Angel</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iv.the_fallen_angel.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Hell's Forge</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iv.hellforge.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Terror's End</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_iv.terrors_end.is_completed">Completed</label></li>
          </ul>
        </ul>
      </ul>
      <ul class="col-md-offset-1">
        <li><i class="fa fa-angle-right rotate"></i> Act V</li>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Siege on Harrogath</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.siege_on_harrogath.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Rescue on Mount Arreat</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.rescue_on_mount_arreat.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Prison of Ice</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.prison_of_ice.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Betrayal of Harrogath</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.betrayal_of_harrogath.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Rite of Passage</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.rite_of_passage.is_completed">Completed</label></li>
          </ul>
        </ul>
        <ul class="col-md-offset-2">
          <li><i class="fa fa-angle-right rotate"></i>Eve of Destruction</li>
          <ul class="col-md-offset-3">
            <li><label><input class="form-check-input" type="checkbox"
                v-model="save.header[difficulty.key].act_v.eve_of_destruction.is_completed">Completed</label></li>
          </ul>
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
    difficulties: [{ key: 'quests_normal', value: "Normal" }, { key: 'quests_nm', value: "Nightmare" }, { key: 'quests_hell', value: "Hell" }]
  };
}
};