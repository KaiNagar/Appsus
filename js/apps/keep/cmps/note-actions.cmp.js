import noteBgColor from "./note-bg-color.cmp.js"



export default {

    props: ['note'],
    template: `
    <section class="action-btns"
         v-if="note">
        <button class="pined-btn"
         @click="pinnedNote">
            <i class="fa-solid fa-thumbtack" 
            :style="{color:note.isPinned? 'orange':''}"></i>
        </button>
            <button
                @click="removeNote">
                <i class="fa-solid fa-trash-can" ></i>
                </button>

                <a @click="showBgColor"
                 class="color-palette-btn">
                <i class="fa-solid fa-palette"></i>

                <note-bg-color
                v-if="isColor"
                @bgColor="changeBgColor"
                />
                </a>
            </section>
`,
    components: {
        noteBgColor,
    },

    data() {
        return {
            isColor: false
        }
    },
    created() {
    },
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
            this.$emit('pinned-note', this.note.id)
        }
    },
    computed: {},
    unmounted() { },
}