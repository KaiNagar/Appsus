import notePreview from './note-preview.cmp.js'

export default {
    template: `
        <div class="note-container">
            
            <note-preview class="note"
            v-for="(note,idx) in notes"
           :key="note.id"
           :note="note"
           @removeNote="$emit('remove-note',$event)"
           @changeBgColor="$emit('change-bg-color',$event)"
           @pinnedNote="$emit('pinned-note', $event)"
           @duplicateNote="$emit('duplicate-note', $event)"
           />
        </div>
`,
    props: ['notes'],
    name: 'note-list',
    data() {
        return {
        }
    },

    components: {
        notePreview
    },

    created() { },

    methods: {
        removeNote(delNoteId) {
            this.$emit('del-note-id', delNoteId)
        },

        changeBgColorEmit(color, noteId) {
            this.$emit('color', color, noteId)
        },
    },

    computed: {},
    unmounted() { },
}