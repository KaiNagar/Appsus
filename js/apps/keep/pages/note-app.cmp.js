import noteList from "../cmps/note-list.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section v-if="notes" class="note-app">
         <note-list v-if="notes" @delNoteId="removeNote" :notes="notes" />
        
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
        // getNotes() {
        //     noteService.query()
        //         .then(notes => {
        //             this.notes = notes
        //             console.log(this.notes)
        //         })
        // },

        removeNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(idx, 1)
            noteService.removeNote(noteId)
        }
    },
    computed: {},
    unmounted() { },
}