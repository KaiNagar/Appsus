import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteActions from "./note-actions.cmp.js"
import { noteService } from "../services/note-service.js";

export default {
    props: ['note'],
    template: `
    <article v-if="note" class="note-preview" :style="bgc">
    <component class="note" :is="note.type"
            :info="note.info">
        </component>
        <note-actions @removeNote="removeNote" :note="note"/>
    </article>
`,
    name: 'note-preview',
    data() {
        return {}
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteActions,
        noteVideo
    },
    created() {
        console.log(this.note);
     },
    methods: {
        removeNote(delNote) {
            this.$emit('remove-note-id', delNote.id)
        }
    },
    computed: {
        bgc() {
            return { backgroundColor: this.note.style.backgroundColor }
        }
    },
    unmounted() { },
}