import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteActions from "./note-actions.cmp.js"
import { noteService } from "../services/note-service.js";

export default {
    props: ['note'],
    template: `
    <article class='note'>
        <p>{{note.type}}</p>
    <component :is="note.type"
            :info="note.info">
        </component>
        <note-actions @remove="removeNote" :note="note"/>
    </article>
`,
    name: 'note-preview'
    ,
    data() {
        return {}
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteActions
    },
    created() { },
    methods: {
        removeNote() {
            this.$emit('remove', this.note)
        }
    },
    computed: {},
    unmounted() { },
};