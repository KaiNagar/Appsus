import { noteService } from '../services/note-service.js';
import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <div class="note-list"
     v-for="(note,idx) in notes" :key="note.id">

      <note-preview @remove="removeNote" :note="note"/>
    </div>
`,
    name: 'note-list!',
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
            this.$emit('remove', this.notes)
        }
    },

    computed: {},
    unmounted() { },
}