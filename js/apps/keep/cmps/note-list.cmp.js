import notePreview from './note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
        <div class="note-container">
          <note-preview class="note"
            v-for="(note,idx) in notes"
           :key="note.id"
           :note="note"
           @removeNote="$emit('remove-note',$event)"
            @changeBgColor="$emit('change-bg-color',$event)"
            @pinnedNote="$emit('pinned-note', $event)"
           />
        </div>
`,
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
    },

    computed: {},
    unmounted() { },
}