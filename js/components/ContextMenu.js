import html from '../html.js';

export default {
    template: html`
        <div class="dropdown-menu" role="menu" :class="options != null ? 'show' : ''" v-bind:style="{top: evt.clientY+'px', left: evt.clientX+'px'}">
            <button class="dropdown-item" v-for="option in options" @click.stop="onClick($event, option)"
                :class="[option.type === 'divider' ? 'dropdown-divider' : '']" v-html="option.text">
            </button>
        </div>
    `,
    data: function(){
        return {
            options: null,
            evt: {}
        }
    },
    methods: {
        showContextMenu($event, obj, options) {
            this.options = options;
            this.obj = obj;
            this.evt = {
                clientX: $event.clientX,
                clientY: $event.clientY + document.documentElement.scrollTop
            }
        },
        onClick($event, option) {
            $event.preventDefault();
            this.$emit("option-clicked", {
                obj: this.obj,
                option: option
            });
        },
        close() {
            this.options = null;
        }
    }
}
