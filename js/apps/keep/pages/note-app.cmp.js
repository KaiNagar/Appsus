import noteList from "../cmps/note-list.cmp.js"
import addNote from "../cmps/add-note.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <main class="main flex">
        <section class="note-app">
            <add-note v-if="notes" />
             <note-list v-if="notes"
             :notes="notes" 
              @removeNote="removeNote"
              @changeBgColor="changeBgColor"
              @pinnedNote="pinnedNote"
               />
            </section>
    </main>
`,
    components: {
        noteList,
        addNote
    },
    name: 'note-app!',
    data() {
        return {
            notes: null,

        }
    },
    created() {
        this.loadNotes()
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes)
        },

        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
        },

        changeBgColor({ color, noteId }) {
            noteService.changeNoteBgc(color, noteId)
                .then(this.loadNotes)
        },

        pinnedNote(pinnedNote) {
            console.log('note is pinned? ', pinnedNote)
            const idx = this.notes.findIndex(note => note.id === pinnedNote.id)
            pinnedNote.lastPos = idx
            if (!pinnedNote.isPinned) {
                console.log('no pinnn', idx, 'notes after: ', this.notes)
                this.notes.splice(idx, 1, pinnedNote)
            } else {
                console.log('yes pinnn')
                this.notes.splice(idx, 1)
                this.notes.unshift(pinnedNote)
            }
        }
    },
    computed: {},
    unmounted() { },
}