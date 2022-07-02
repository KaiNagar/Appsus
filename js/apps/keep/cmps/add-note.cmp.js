import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section class="add-note">
        <form @submit.prevent="createNote"
                class="add-note-form">
                <input ref="addNoteInput"
                :placeholder="placeholder"
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
            <input ref="userImage" @click="setNoteType('note-img',$event)" type="file">
            <span id="todo" 
                @click="setNoteType('note-todos')">
                <i class="fa-solid fa-list"></i>
            </span>
            <span @click="newNote.type='note-video'" id="video">video</span>
            <button>
                <i class="fa-solid fa-check"></i>
            </button>
        </form>
    </section>
`,
    data() {
        return {
            newNote: {
                type: '',
                isPinned: false,
                info: null,
                backgroundColor: 'white'
            },
        }
    },
    created() { },
    methods: {
        setNoteType(type) {
            let input = this.$refs.addNoteInput
            this.newNote.type = type
        },

        createNote() {
            let note = this.newNote
            let noteType = this.newNote.type

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
    computed: {
        placeholder() {
            const { type } = this.newNote
            if (type === 'note-txt') return 'Enter text title'
            if (type === 'note-img') return 'Add a image'
            if (type === 'note-todos') return 'Enter title for your todos'
        }
    },
}
