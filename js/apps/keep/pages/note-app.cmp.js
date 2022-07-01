import noteList from "../cmps/note-list.cmp.js"
import addNote from "../cmps/add-note.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <main class="main flex">
        <section class="note-app">
            <add-note @newNote="addNewNote" />

            <note-list v-if="pinnedNotes && pinnedNotes.length"
            :notes="pinnedNotes" 
            @removeNote="removeNote"
            @changeBgColor="changeBgColor"
            @pinnedNote="pinnedNote"
              />
            <note-list v-if="unPinnedNotes && unPinnedNotes.length"
            :notes="unPinnedNotes" 
            @removeNote="removeNote"
            @changeBgColor="changeBgColor"
            @pinnedNote="pinnedNote"
              />
            </section>
    </main>
`,
    components: {
        noteList,
        addNote,
    },
    name: 'app note',
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
        addNewNote(newNote) {
            noteService.addNote(newNote).then(this.loadNotes)
        },
        pinnedNote(noteId) {
            noteService.togglePinned(noteId).then(this.loadNotes)
        },
        removeNote(noteId) {
            noteService.removeNote(noteId).then(this.loadNotes)
        },
        changeBgColor({ color, noteId }) {
            noteService.changeNoteBgc(color, noteId)
                .then(this.loadNotes)
        },
    },
    computed: {
        pinnedNotes() {
            return this.notes && this.notes.filter(note => note.isPinned)
        },
        unPinnedNotes() {
            return this.notes && this.notes.filter(note => !note.isPinned)
        }
    },
    unmounted() { },
}