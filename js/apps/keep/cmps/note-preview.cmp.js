import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteActions from "./note-actions.cmp.js"
import { noteService } from "../services/note-service.js"


export default {
    props: ['note'],
    template: `
    <article :style="bgc">
        <h3 class="note-title">{{note.info.title}}</h3>
        <component 
        :is="note.type"
        :info="note.info"
        @newTxt="updateTxt"
        >
        </component>
        <note-actions class="note-actions"
            :note="note"
            @removeNote="$emit('remove-note',$event)"
            @changeBgColor="$emit('change-bg-color',$event)"
            @pinnedNote="$emit('pinned-note', $event)"
        />
    </article>
`,
    name: 'note-preview',
    data() {
        return {}
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteActions,
        noteVideo,
    },

    created() {
    },

    methods: {
        updateTxt(txt){
            this.note.info.txt = txt
            noteService.updateNote(this.note)
        }
    },

    computed: {
        bgc() {
            return { backgroundColor: this.note?.style?.backgroundColor }
        }
    },
    unmounted() { },
}