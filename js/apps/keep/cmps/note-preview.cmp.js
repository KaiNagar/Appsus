import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteActions from "./note-actions.cmp.js"
import { noteService } from "../services/note-service.js"


export default {
    template: `
    <article :style="bgc">
        <div class="note-title">
            <h3 v-show="!isEditTitle" 
            @click="onEditTitle">{{note.title}}</h3>
            <input class="title-input" v-show="isEditTitle"
            ref="titleInput"
            type="text" 
            :value="note.title"
            @input="updateTitle($event.target.value)" 
            @keyup.enter="isEditTitle=false"
            @blur="isEditTitle=false"
            />
        </div>
        <component 
        :is="note.type"
        :info="note.info"
        @updateNoteInfo="updateNoteInfo"
        >
    </component>
    <note-actions class="note-actions"
    :note="note"
    @removeNote="$emit('remove-note',$event)"
    @changeBgColor="$emit('change-bg-color',$event)"
    @pinnedNote="$emit('pinned-note', $event)"
    @duplicateNote="$emit('duplicate-note', $event)"
    />
</article>
`,
    props: ['note'],
    name: 'note-preview',
    data() {
        return {
            isEditTitle: false
        }
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
        updateNoteInfo(info) {
            this.note.info = info
            noteService.save(this.note)
        },

        updateTitle(newTitle) {
            this.note.title = newTitle
            noteService.save(this.note)
        },

        onEditTitle() {
            this.isEditTitle = true
            this.$refs.titleInput.focus()
            noteService.save(this.note)
        }
    },

    computed: {
        bgc() {
            return { backgroundColor: this.note?.style.backgroundColor }
        }
    },
}