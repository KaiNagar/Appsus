import { noteService } from "../services/note-service.js"

export default {
    template: `
    <section>
        <form @submit.prevent="createNote" class="add-note-form">
            <input ref="addNoteInput" placeholder="Add Note" type="text" />
            <span @click="setNoteType('note-txt')" id="text">txt</span>
            <span @click="setNoteType('note-img')" id="img">image</span>
            <!-- <input ref="userImage" @click="setNoteType('note-img',$event)" type="file"> -->
            <span @click="setNoteType('note-todos')" id="todo">todo</span>
            <!-- <span @click="newNote.type='note-video'" id="video">video</span> -->
            <button>Add note</button>
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
        setNoteType(type, ev) {
            let input = this.$refs.addNoteInput
            this.newNote.type = type
            if (type === 'note-txt') input.placeholder = 'Enter title following a comma then txt'
            if (type === 'note-img') input.placeholder = 'Enter title following a comma then url'
            if (type === 'note-todos') input.placeholder = 'Enter title following a comma then todos'
        },
        createNote() {
            let note = this.newNote
            let value = this.$refs.addNoteInput.value
            if (!value) return
            let title = value.split(',')[0]
            let info = value.split(',')[1]
            if (note.type === 'note-txt') {
                note.info = {
                    title: title,
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
