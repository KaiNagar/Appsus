import noteList from "../cmps/note-list.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section class="note-list">
         <note-list v-if="notes" @removed="removeNote(idx)" :notes="notes" />
        
        </section>
`,
    components: {
        noteList,
    },
    data() {
        return {
            notes: null
        }
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    methods: {
        removeNote(idx) {
            this.notes.splice(idx, 1)
            noteService.removeNote(this.notes, idx)
        }
    },
    computed: {},
    unmounted() { },
}