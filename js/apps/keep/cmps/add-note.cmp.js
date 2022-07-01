import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section class="add-note">
        <form @submit.prevent="createNote"
                class="add-note-form">
                <input ref="addNoteInput"
                placeholder="Add Note..."
                type="text"
               />
            <span id="text" 
                @click="setNoteType('note-txt')">
                <i class="fa-solid fa-t"></i>
            </span>
            <span id="img" 
                @click="setNoteType('note-img')">
                <i class="fa-solid fa-image"></i>
            </span>
            <!-- <input ref="userImage" @click="setNoteType('note-img',$event)" type="file"> -->
            <span id="todo" 
                @click="setNoteType('note-todos')">
                <i class="fa-solid fa-list"></i>
            </span>
            <!-- <span @click="newNote.type='note-video'" id="video">video</span> -->
            <!-- <button>Add note</button> -->
        </form>
    </section>
`,
    data() {
        return {
            newNote: {
                type: 'note-txt',
                isPinned: false,
                info: null,
                backgroundColor: 'grey'
            },
        }
    },
    created() { },
    methods: {
        setNoteType(type) {
            let input = this.$refs.addNoteInput
            this.newNote.type = type

            if (type === 'note-txt') input.placeholder = 'Enter text title'
            if (type === 'note-img') input.placeholder = 'Add a image'
            if (type === 'note-todos') input.placeholder = 'Enter title for your todos'
        },

        createNote() {
            let note = this.newNote
            let value = this.$refs.addNoteInput.value

            if (!value) return
            let title = value
            if (note.type === 'note-txt') {
                note.info = {
                    title,
                    txt: info
                }
            } else if (note.type === 'note-img') {
                let userImage = this.$refs.userImage.value
                console.log(userImage);
                note.info = {
                    title: title,
                    url: info.trim()
                }
            }
            else if (note.type === 'note-todos') {
                note.info = {
                    title: title,
                    todos: info
                }
            }
            this.$refs.addNoteInput.value = ''
            this.$emit('newNote', note)
        }
    },
    computed: {},
    unmounted() { },
}
