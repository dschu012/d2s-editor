
import html from '../html.js';

const flags = ["is_completed", "is_requirement_completed", "is_received",
"unk3", "unk4", "unk5", "unk6", "consumed_scroll", "unk8", "unk9", "unk10",
"unk11", "closed", "done_recently", "unk14", "unk15"]

const quests = [
  {
    key: "act_i", label: "Act I", all: false,
    quests: [
      { key: "den_of_evil", label: "Den Of Evil", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "sisters_burial_grounds", label: "Sisters' Burial Grounds", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_search_for_cain", label: "Search for Cain", values: [{ key: "unk10", label: "Cow King Killed" }, { key: "is_completed", label: "Completed" }] },
      { key: "the_forgotten_tower", label: "The Forgotten Tower", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "tools_of_the_trade", label: "Tools of the Trade", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "sisters_to_the_slaughter", label: "Sisters to the Slaughter", values: [{ key: "is_completed", label: "Completed" }] },
    ]
  },
  {
    key: "act_ii", label: "Act II", all: false,
    quests: [
      { key: "radaments_lair", label: "Radament's Lair", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_horadric_staff", label: "The Horadric Staff", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "tainted_sun", label: "Tainted Sun", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "arcane_sanctuary", label: "Arcane Sanctuary", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_summoner", label: "The Summoner", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_seven_tombs", label: "The Seven Tombs", values: [{ key: "is_completed", label: "Completed" }] },
    ]
  },
  {
    key: "act_iii", label: "Act III", all: false,
    quests: [
      { key: "the_golden_bird", label: "The Golden Bird", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "blade_of_the_old_religion", label: "Blade of the Old Religion", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "khalims_will", label: "Khalim's Will", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "lam_esens_tome", label: "Lam Esen's Tome", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_blackened_temple", label: "The Blackened Temple", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "the_guardian", label: "The Guardian", values: [{ key: "is_completed", label: "Completed" }] },
    ]
  },
  {
    key: "act_iv", label: "Act IV", all: false,
    quests: [
      { key: "the_fallen_angel", label: "Fallen Angel", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "hellforge", label: "Hell's Forge", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "terrors_end", label: "Terror's End", values: [{ key: "is_completed", label: "Completed" }] },
    ]
  },
  {
    key: "act_v", label: "Act V", all: false,
    quests: [
      { key: "siege_on_harrogath", label: "Siege on Harrogath", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "rescue_on_mount_arreat", label: "Rescue on Mount Arreat", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "prison_of_ice", label: "Prison of Ice", values: [{ key: "consumed_scroll ", label: "Consumed Scroll" }, { key: "is_completed", label: "Completed" }] },
      { key: "betrayal_of_harrogath", label: "Betrayal of Harrogath", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "rite_of_passage", label: "Rite of Passage", values: [{ key: "is_completed", label: "Completed" }] },
      { key: "eve_of_destruction", label: "Eve of Destruction", values: [{ key: "is_completed", label: "Completed" }] },
    ]
  },
];

export default {
  template: html`
<div class="form-row">
  <div class="col-md-4" v-for="difficulty in difficulties">
    <ul>
      <li>
        <label><input class="form-check-input" type="checkbox" @input="updateDiff(difficulty)" v-model="difficulty.all"/>{{ difficulty.label }}</label>
        <button type="button" class="btn btn-link btn-sm" title="Reset Difficulty" @click="resetDifficulty(difficulty)"><i class="fa fa-undo"></i></button>
      </li>
      <ul v-for="act in difficulty.acts">
        <li>
          <label><input class="form-check-input" type="checkbox" @input="updateAct(difficulty, act)" v-model="act.all" />{{ act.label }}</label>
          <button type="button" class="btn btn-link btn-sm" title="Reset Act" @click="resetAct(difficulty, act)"><i class="fa fa-undo"></i></button>
        </li>
        <ul v-for="quest in act.quests">
          <li><button type="button" class="btn btn-link" title="Reset Quest" @click="reset(difficulty, act, quest)"><i class="fa fa-undo"></i></button><label>{{ quest.label }}</label></li>
          <ul>
            <li v-for="state in quest.values"><label><input class="form-check-input" type="checkbox" @click="updateQuest(difficulty, act, quest, state, null)" v-model="save.header[difficulty.key][act.key][quest.key][state.key]">{{ state.label }}</label></li>
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
      difficulties: [
        { key: 'quests_normal', all: false, label: "Normal", acts: JSON.parse(JSON.stringify(quests)) },
        { key: 'quests_nm', all: false, label: "Nightmare", acts: JSON.parse(JSON.stringify(quests)) },
        { key: 'quests_hell', all: false, label: "Hell", acts: JSON.parse(JSON.stringify(quests)) }
      ],
    };
  },
  methods: {
    updateQuest(difficulty, act, quest, state, newState) {
      const self = this;
      function questReward(difficulty, act, quest, state, attributes, amount, newState) {
        if(newState === false){
          amount *= -1;
        }
        for(const attribute of attributes) {
          self.save.attributes[attribute] = (self.save.attributes[attribute] == null ? 0 : self.save.attributes[attribute]) + amount;
        }
      }

      if (newState != null && newState === self.save.header[difficulty.key][act.key][quest.key][state.key])
        return;
      if(newState == null)
        newState = !self.save.header[difficulty.key][act.key][quest.key][state.key];
      if(["den_of_evil", "radaments_lair"].indexOf(quest.key) > -1) {
        questReward(difficulty.key, act.key, quest.key, state.key, ["unused_skill_points"], 1, newState);
      } else if (quest.key === "the_fallen_angel") {
        questReward(difficulty.key, act.key, quest.key, state.key, ["unused_skill_points"], 2, newState);
      } else if (quest.key === "lam_esens_tome") {
        questReward(difficulty.key, act.key, quest.key, state.key, ["unused_stats"], 5, newState);
      } else if (quest.key === "the_golden_bird") {
        questReward(difficulty.key, act.key, quest.key, state.key, ["current_hp", "max_hp"], 20, newState);
      }
      if(act.all !== newState && act.all) {
        act.all = false;
      }
      if(difficulty.all !== newState && difficulty.all) {
        difficulty.all = false;
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
    updateAct(difficulty, act) {
      for (const q of act.quests) {
        for (const state of q.values) {
          this.save.header[difficulty.key][act.key][q.key][state.key] = !act.all;
          this.updateQuest(difficulty, act, q, state, !act.all);
        }
      }
    },
    resetDifficulty(difficulty) {
      for(const act of difficulty.acts) {
        this.resetAct(difficulty, act);
      }
      difficulty.all = false;
    },
    resetAct(difficulty, act) {
      for(const q of act.quests) {
        this.reset(difficulty, act, q);
      }
      act.all = false;
    },
    reset(difficulty, act, quest) {
      for(const flag of flags) {
        if(flag === "is_completed" && this.save.header[difficulty.key][act.key][quest.key][flag] === true)
          this.updateQuest(difficulty, act, quest, flag, false);
        this.save.header[difficulty.key][act.key][quest.key][flag] = false;
      }
    }
  }
};
