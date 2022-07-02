import noteList from "../cmps/note-list.cmp.js"
import addNote from "../cmps/add-note.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import { noteService } from "../services/note-service.js"

export default {
    template: `
    <main class="main flex">
        <section class="note-app">
               <note-filter class="note-filter"
               :notes="notes"
               @setFilter="setFilter" 
               />
               <add-note @newNote="addNewNote" 
               />
               <div class="note-list-container">
               <div class="pinned-line"><i class="fa-solid fa-thumbtack"></i></div>
           
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
                @duplicateNote="duplicateNote"
                  />
            </div>
            </section>
    </main>
`,
    components: {
        noteList,
        addNote,
        noteFilter
    },
    name: 'app note',

    data() {
        return {
            notes: null,
            filterBy: null
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
            console.log(newNote)
            noteService.addNote(newNote)
                .then(this.loadNotes)
        },

        pinnedNote(noteId) {
            noteService.togglePinned(noteId)
                .then(this.loadNotes)
        },

        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
        },

        changeBgColor({ color, noteId }) {
            noteService.changeNoteBgc(color, noteId)
                .then(this.loadNotes)
        },

        duplicateNote(copyNote) {
            console.log(copyNote)
            noteService.addNote(copyNote)
                .then(this.loadNotes)
        },

        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy, "i")
            return this.notes.filter((note) =>
                regex.test(note.title) || regex.test(note.type)
            )
        },

        pinnedNotes() {
            return this.notesToShow && this.notesToShow.filter(note => note.isPinned)
        },

        unPinnedNotes() {
            return this.notesToShow && this.notesToShow.filter(note => !note.isPinned)
        }
    },

}