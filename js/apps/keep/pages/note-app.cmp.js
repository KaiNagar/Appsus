import noteList from "../cmps/note-list.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section class="note-app">
         <note-list v-if="notes" @remove="removeNote(idx)" :notes="notes" />
        
        </section>
`,
    components: {
        noteList,
    },
    name: 'note-app!',
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
        getNotes() {
            keepService.query().then(notes => {
                this.notes = notes
                console.log(this.notes)
            })
        },

        removeNote(idx) {
            this.notes.splice(idx, 1)
            noteService.removeNote(this.notes, idx)
        }
    },
    computed: {},
    unmounted() { },
}