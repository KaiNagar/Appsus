import noteBgColor from "./note-bg-color.cmp.js"
import { noteService } from "../services/note-service.js";



export default {

    props: ['note'],
    template: `
    <section class="action-btns"
     v-if="note" >
        <button class="pined-btn"
         @click="pinnedNote">
            <i class="fa-solid fa-thumbtack"></i>
        </button>
            <button
                @click="removeNote">
                <i class="fa-solid fa-trash-can"></i>
                </button>
                <a @click="showBgColor"
                 class="color-palette-btn">
                <i class="fa-solid fa-palette"></i>
                <note-bg-color v-if="isColor"
                 @bgColor="changeBgColor"
                 /></a>
    </section>
`,
    components: {
        noteBgColor,
        noteService,
    },
    data() {
        return {
            isColor: false,
        }
    },
    created() { },
    methods: {
        showBgColor() {
            this.isColor = !this.isColor
        },

        changeBgColor(color) {
            this.$emit('change-bg-color', { color, noteId: this.note.id })
        },

        removeNote() {
            this.$emit('remove-note', this.note.id)
        },
        pinnedNote() {
            console.log('actions: ', this.note);
            if (!this.note.isPinned) this.note.isPinned = true
            else this.note.isPinned = !this.note.isPinned
            this.$emit('pinned-note', this.note)

        }
    },
    computed: {},
    unmounted() { },
};