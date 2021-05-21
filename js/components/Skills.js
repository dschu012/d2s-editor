import html from '../html.js';

export default {
  template: html`
<div class="form-row">
  <div class="col-md-4" v-for="i in 3">
    <div class="row">
      <div class="col-md-6" v-for="j in 10">
        <label :for="'Skill' + i + '_' + j">{{save.skills[(i - 1) * 10 + (j - 1)].name}}</label>
        <input type="number" class="form-control" :id="'Skill' + i + '_' + j" min="0" max="20"
          v-model.number="save.skills[(i - 1) * 10 + (j - 1)].points">
      </div>
    </div>
  </div>
</div>
`,
props: {
  save: Object,
}
};