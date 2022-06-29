import { noteService } from '../services/note-service.js';
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <div v-for="(note,idx) in notes" :key="note.id">
      <note-preview @remove="removeNote" :note="note"/>
    </div>
`,
    data() {
        return {
        }
    },

    components: {
        notePreview
    },

    created() { },

    methods: {
        removeNote() {
            this.$emit('removed', this.notes)
        }
    },

    computed: {},
    unmounted() { },
}